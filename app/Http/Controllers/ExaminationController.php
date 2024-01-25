<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Question;
use App\Choice;
use App\Examination;
use App\ExaminationQuestion;
use App\ExaminationCategory;
use App\ExaminationAnswerLog;
use Carbon\Carbon;
use App\Http\Requests\StartExaminationRequest;
use App\Http\Requests\UpdateExaminationRequest;

class ExaminationController extends Controller
{
    public function index(Request $request){
        //$questionIds = $request['question_ids'];
        //return view('examination')->with('question_ids', $questionIds);
        return view('examination');
    }

    public function startExamination(StartExaminationRequest $request){
        $loginUserId = Auth::user()->id;
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $setQuestionCount = $request->input('set_question_count');
        $setPassingScore = $request->input('set_passing_score');
        $setTime = $request->input('set_time');
        $categoryIds = $request->input('category_ids');
        $title = $request->input('title');
        $memo = $request->input('memo');
        // 1カテゴリあたりの出題数
        $questionCountOfOneCategory = floor($setQuestionCount / count($categoryIds));
        $exportQuestionIds = [];
        // カテゴリごとに出題する問題をランダムで設定
        foreach($categoryIds as $categoryId){
            // question_idリストをcategory_idで検索
            $questionIds = Question::where('status_id', 1)->where('category_id', $categoryId)->pluck('question_id');
            // 出題可能な問題数が不足している場合、1カテゴリあたりの出題数を再設定
            if ($questionCountOfOneCategory > count($questionIds)){
                $questionCountOfOneCategory = count($questionIds);
            }
            // 1カテゴリにおける暫定の出題数
            $exportCount = 0;
            while($exportCount < $questionCountOfOneCategory){
                $randomIndex = mt_rand(0, count($questionIds) - 1);
                // 乱数でqurstion_idを取得
                $questionId = $questionIds[$randomIndex];
                // 出題リストに未設定の場合
                if(!in_array($questionId , $exportQuestionIds)){
                    $exportQuestionIds[] = $questionId;
                    $exportCount++;
                }
            }
        }
        // 未設定の問題数
        $leftQuestionCount = $setQuestionCount - count($exportQuestionIds);
        // 出題設定されていない問題を取得
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $categoryIds)->whereNotIn('question_id', $exportQuestionIds)->pluck('question_id');
        $exportCount = 0;
        while($exportCount < $leftQuestionCount){
            $randomIndex = mt_rand(0, count($questionIds) - 1);
            $questionId = $questionIds[$randomIndex];
            if(!in_array($questionId , $exportQuestionIds)){
                $exportQuestionIds[] = $questionId;
                $exportCount++;
            }
        }
        // 模擬試験レコードを作成
        DB::beginTransaction();
        try {
            //examinationテーブル
            $examination = new Examination;
            $examination->user_id = $loginUserId;
            $examination->examination_status_id = 1;
            $examination->title = $title;
            $examination->memo = $memo;
            $examination->set_time = $setTime;
            $examination->set_question_count = $setQuestionCount;
            $examination->set_passing_score = $setPassingScore;
            $examination->score = 0;
            $examination->started_at = Carbon::now();
            $examination->save();
            $insertedExaminationId = $examination->examination_id;
            //examination_questionsテーブル
            foreach ($exportQuestionIds as $questionId) {
                $examinationQuestion = new ExaminationQuestion;
                $examinationQuestion->examination_id = $insertedExaminationId;
                $examinationQuestion->question_id = $questionId;
                $examinationQuestion->is_answered = false;
                $examinationQuestion->is_answered_correct = false;
                $examinationQuestion->is_marked = false;
                $examinationQuestion->save();
            }
            //examination_categoriesテーブル
            foreach ($categoryIds as $categoryId) {
                $examinationCategory = new ExaminationCategory;
                $examinationCategory->examination_id = $insertedExaminationId;
                $examinationCategory->category_id = $categoryId;
                $examinationCategory->save();
            }
            DB::commit();
            return response()->json(['examinationId' => $insertedExaminationId]);
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }

    public function getExaminationData(Request $request){
        $examinationId = $request->input('examination_id');
        $examination = Examination::with(
            'examinationQuestions',
            'examinationQuestions.question',
            'examinationQuestions.question.images',
        )->find($examinationId)->toArray();
        // image_fileプロパティを追加
        foreach($examination["examination_questions"] as $key1 => $value1){
            $questionId = $examination["examination_questions"][$key1];
            foreach ($examination["examination_questions"][$key1]["question"]["images"] as $key2 => $value2) {
                $imagePath = $examination["examination_questions"][$key1]["question"]["images"][$key2]["image_path"];
                $mimeType = \Storage::disk('sftp')->getMimeType($imagePath);
                $imageFile = \Storage::disk('sftp')->get($imagePath);
                $imageFile = "data:".$mimeType.";base64,".base64_encode($imageFile);
                $examination["examination_questions"][$key1]["question"]["images"][$key2]["image_file"] = $imageFile;
            }
        }
        return response()->json(['examination' => $examination]);
    }

    public function getExaminationQuestion(Request $request){
        $examinationQuestionId = $request->input('examination_question_id');
        $examinationQuestion = ExaminationQuestion::with(
            'question',
            'question.choices',
            'question.images',
            'examinationAnswerLogs',
            'examinationAnswerLogs.choice'
        )->find($examinationQuestionId)->toArray();

        // image_fileプロパティを追加
        foreach ($examinationQuestion["question"]["images"] as $key => $value) {
            $imageType = $examinationQuestion["question"]["images"][$key]["image_type"];
            // answer画像を取り除く
            if($imageType == "answer"){
                unset($examinationQuestion["question"]["images"][$key]);
                continue;
            }
            $imagePath = $examinationQuestion["question"]["images"][$key]["image_path"];
            $mimeType = \Storage::disk('sftp')->getMimeType($imagePath);
            $imageFile = \Storage::disk('sftp')->get($imagePath);
            $imageFile = "data:".$mimeType.";base64,".base64_encode($imageFile);
            $examinationQuestion["question"]["images"][$key]["image_file"] = $imageFile;
        }

        return response()->json(['examinationQuestion' => $examinationQuestion]);
    }
    public function answerExaminationQuestion(Request $request){
        $examinationQuestionId = $request->input('examination_question_id');
        $selectedChoiceIds = $request->input('selected_choice_ids');
        $beforeSelectedChoiceIds = ExaminationAnswerLog::where('examination_question_id', $examinationQuestionId)->pluck('choice_id')->toArray();
        $deleteChoiceIds = array_diff($beforeSelectedChoiceIds, $selectedChoiceIds);
        $insertChoiceIds = array_diff($selectedChoiceIds, $beforeSelectedChoiceIds);
        $isMarked = $request->input('is_marked');
        DB::beginTransaction();
        try {
            //examination_answer_logテーブル
            //選択済みレコードを削除
            ExaminationAnswerLog::whereIn('choice_id', $deleteChoiceIds)->delete();
            //新規選択レコードを追加
            foreach ($insertChoiceIds as $choiceId) {
                $examinationAnswerLog = new ExaminationAnswerLog;
                $examinationAnswerLog->examination_question_id = $examinationQuestionId;
                $examinationAnswerLog->choice_id = $choiceId;
                $examinationAnswerLog->save();
            }
            //examination_questionテーブル
            //問題のステータスを回答済みに更新
            $examinationQuestion = ExaminationQuestion::find($examinationQuestionId);
            $questionId = $examinationQuestion->question_id;
            $examinationQuestion->is_answered = true;
            $isCorrectedList = Choice::whereIn('choice_id', $selectedChoiceIds)->pluck('is_correct')->toArray();
            $examinationQuestion->is_answered_correct = !in_array(false, $isCorrectedList);
            $examinationQuestion->is_marked = $isMarked;
            $examinationQuestion->save();
            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }

    public function skipAnswerExaminationQuestion(Request $request){
        $examinationQuestionId = $request->input('examination_question_id');
        $isMarked = $request->input('is_marked');
        DB::beginTransaction();
        try {
            //examination_answer_logテーブル
            ExaminationAnswerLog::where('examination_question_id', $examinationQuestionId)->delete();
            //examination_questionテーブル
            //問題のステータスを未回答に更新
            $examinationQuestion = ExaminationQuestion::find($examinationQuestionId);
            $examinationQuestion->is_answered = false;
            $examinationQuestion->is_answered_correct = false;
            $examinationQuestion->is_marked = $isMarked;
            $examinationQuestion->save();
            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }
    public function finishExamination(Request $request){
        $examinationId = $request->input('examination_id');
        DB::beginTransaction();
        try {
            $examination = Examination::with('examinationQuestions')->find($examinationId);
            $examination->score = $examination['examinationQuestions']->where('is_answered_correct', true)->count();
            $examination->examination_status_id = 2;
            $examination->finished_at = Carbon::now();
            $examination->save();
            DB::commit();
            return;
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }
    public function resultIndex($examinationId){
        $param = ['examination_id' => $examinationId];
        return view('examination_result', $param);
    }

    public function getExaminationResultData(Request $request){
        $examinationId = $request->input('examination_id');
        $examination = Examination::with(
            'user',
            'examinationCategories',
            'examinationQuestions',
            'examinationQuestions.question',
            'examinationQuestions.question.category',
            'examinationQuestions.question.category.workbook',
        )->find($examinationId);
        // -------------------------------------------------------
        // 正解率と合否判定のフィールドを追加する
        // -------------------------------------------------------
        $correctAnswerCount = $examination['examinationQuestions']->where('is_answered_correct', true)->count();
        $questionCount = $examination['examinationQuestions']->count();
        $correctAnswerRate = 0.0;
        if ($questionCount > 0){
            $correctAnswerRate = round($correctAnswerCount / $questionCount * 100, 1);
        }
        $examination['correct_answer_rate'] = $correctAnswerRate;
        $examination['is_passing'] = $correctAnswerCount >= $examination->set_passing_score;
        // -------------------------------------------------------
        // 正答の選択肢と回答した選択肢、のシンボル文字列をフィールドに追加する
        // -------------------------------------------------------
        $examination['examinationQuestions']->map(function ($examinationQuestion) {
            $questionId = $examinationQuestion['question_id'];
            $correctChoiceSymbols = Choice::where('question_id', $questionId)
                ->where('is_correct', true)->pluck('choice_symbol')->toArray();
            $correctChoiceSymbolString = implode(',', $correctChoiceSymbols);
            $examinationQuestion['correct_choice_symbol_string'] = $correctChoiceSymbolString;
            $examinationQuestionId = $examinationQuestion['examination_question_id'];
            $answeredChoiceIds = ExaminationAnswerLog::where('examination_question_id', $examinationQuestionId)
                ->pluck('choice_id')->toArray();
            $answeredChoiceSymbols = Choice::whereIn('choice_id', $answeredChoiceIds)
                ->pluck('choice_symbol')->toArray();
            $answeredChoiceSymbolString = implode(',', $answeredChoiceSymbols);
            if($answeredChoiceSymbolString == ""){
                $answeredChoiceSymbolString = "-";
            }
            $examinationQuestion['answered_choice_symbol_string'] = $answeredChoiceSymbolString;
        });
        return response()->json(['examination' => $examination]);
    }

    public function updateExamination(UpdateExaminationRequest $request){
        // -------------------------------------------------------
        // 模擬試験終了後のデータを更新する関数
        // -------------------------------------------------------
        $examinationId = $request->input('examination_id');
        $title = $request->input('title');
        $memo = $request->input('memo');
        DB::beginTransaction();
        try {
            //examinationテーブルの更新
            $examination = Examination::find($examinationId);
            $examination->title = $title;
            $examination->memo = $memo;
            $examination->save();
            DB::commit();
            return response()->json(['examination' => $examination]);
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }

    public function deleteExamination(Request $request){
        $examinationId = $request->input('examination_id');
        DB::beginTransaction();
        try {
            //examinationレコードの削除
            $examination = Examination::find($examinationId);
            $examination->delete();
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }
}
