<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Http\Controllers\QuestionController;

class ExaminationController extends Controller
{
    public function index(Request $request){
        //$questionIds = $request['question_ids'];
        //return view('examination')->with('question_ids', $questionIds);
        return view('examination');
    }
    public function getExaminationQuestionIds(Request $request){
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $questionCount = $request->input('question_count');
        $examinationTime = $request->input('examination_time');
        $categoryIds = $request->input('category_ids');
        // 1カテゴリあたりの出題数
        $questionCountOfOneCategory = floor($questionCount / count($categoryIds));
        $exportQuestionIds = [];
        // カテゴリごとに問題を設定
        foreach($categoryIds as $categoryId){
            $questionIds = Question::where('status_id', 1)->where('category_id', $categoryId)->pluck('question_id');
            if(count($questionIds) == 0){
                continue;
            } 
            $exportCount = 0;
            while($exportCount < $questionCountOfOneCategory){
                if (count($questionIds) == $exportCount){
                    break;
                }
                $randomIndex = mt_rand(0, count($questionIds) - 1);
                $questionId = $questionIds[$randomIndex];
                if(!in_array($questionId , $exportQuestionIds)){
                    $exportQuestionIds[] = $questionId;
                    $exportCount++;
                }
            }
        }
        // 未設定の問題数
        $leftQuestionCount = $questionCount - count($exportQuestionIds);
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
        return response()->json(['examinationQuestionIds' => $exportQuestionIds]);
    }
    public function getExaminationData(Request $request){
        $questionIds = $request->input();
        $questions = Question::with('category.workbook', 'images')->whereIn('question_id', $questionIds)->get();
        // image_fileプロパティを追加
        foreach($questions as &$question){
            $questionId = $question["question_id"];
            foreach ($question["images"] as &$image) {
                $imagePath = $image["image_path"];
                $mimeType = \Storage::disk('sftp')->getMimeType($imagePath);
                $imageFile = \Storage::disk('sftp')->get($imagePath);
                $imageFile = "data:".$mimeType.";base64,".base64_encode($imageFile);
                $image["image_file"] = $imageFile;
            }
            unset($image);
        }
        unset($question);
        return response()->json(['questions' => $questions]);
    }
}
