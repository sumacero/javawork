<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadQuestionRequest;
use App\User;
use App\Category;
use App\Subcategory;
use App\Question;
use App\Choice;
use App\Answer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class MakeQuestionController extends Controller
{
    public function index(){
        return view('make_question');
    }
    public function getCategories(){
        $categories = Category::all();
        $subcategories = Subcategory::all();
        $dbData = compact('categories', 'subcategories');
        return response()->json(['dbData' => $dbData]);
    }
    //問題を一時保存する関数(ステータス:編集中、バリデーション無し、未完成状態で保存可能)
    public function saveQuestion(Request $request){
        $loginUserId = Auth::user()->id;
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $question_id = $request->input('question_id');
        $question_text = $request->input('question_text');
        if(is_null($question_text)){
            $question_text = "";
        }
        $answer_text = $request->input('answer_text');
        if(is_null($answer_text)){
            $answer_text = "";
        }
        $subcategory_id = $request->input('subcategory_id');
        $correct_choice_symbol = $request->input('correct_choice_symbol');
        $symbol = "ABCDEFGH";
        $choice_text_array = [];
        for($i = 0; $i < strlen($symbol); $i++) {
            $propName = "choice_text." . $symbol[$i];
            $choice_text = $request->input($propName);
            if(isset($choice_text)){
                $choice_text_array[$symbol[$i]] = $choice_text;
            }
        }

        //新規作成か判定
        if(is_null($question_id)){
            //------------------------------------------------------------------
            //レコードの追加
            //------------------------------------------------------------------
            DB::beginTransaction();
            //questionsテーブル
            $question = new Question;
            $question->create_user_id = $loginUserId;
            $question->update_user_id = $loginUserId;
            $question->status_id = 2; //1:公開,2:編集中
            $question->subcategory_id = $subcategory_id;
            $question->question_text = $question_text;
            $question->save();
            $inserted_question_id = $question->question_id;
            //choicesテーブル
            $correct_choice_id = null;
            $choices = [];
            foreach ($choice_text_array as $choice_symbol => $choice_text) {
                $choice = new Choice;
                $choice->question_id = $inserted_question_id;
                $choice->choice_symbol = $choice_symbol;
                $choice->choice_text = $choice_text;
                $choice->save();
                array_push($choices, $choice);
                if($choice_symbol == $correct_choice_symbol){
                    $correct_choice_id = $choice->choice_id;
                }
            }
            //answersテーブル
            $answer = new Answer;
            $answer->question_id = $inserted_question_id;
            $answer->choice_id = $correct_choice_id;
            $answer->answer_text = $answer_text;
            $answer->save();
            DB::commit();
            return $inserted_question_id;
        }else{
            //------------------------------------------------------------------
            //レコードの更新
            //------------------------------------------------------------------
            DB::beginTransaction();
            //questionsテーブル
            $question = Question::find($question_id);
            $question->update_user_id = $loginUserId;
            $question->status_id = 2; //1:公開,2:編集中
            $question->subcategory_id = $subcategory_id;
            $question->question_text = $question_text;
            $question->save();
            Schema::disableForeignKeyConstraints(); //一時的に外部キー制約を解除
            //choicesテーブル
            Choice::where('question_id', $question_id)->delete(); //問題に対する選択肢を全削除
            $correct_choice_id = null;
            $choices = [];
            foreach ($choice_text_array as $choice_symbol => $choice_text) {
                $choice = new Choice;
                $choice->question_id = $question_id;
                $choice->choice_symbol = $choice_symbol;
                $choice->choice_text = $choice_text;
                $choice->save();
                array_push($choices, $choice);
                if($choice_symbol == $correct_choice_symbol){
                    $correct_choice_id = $choice->choice_id;
                }
            }
            //answersテーブル
            $answer = Answer::where('question_id', $question_id)->first();
            $answer->choice_id = $correct_choice_id;
            $answer->answer_text = $answer_text;
            $answer->save();
            Schema::enableForeignKeyConstraints(); //外部キー制約を有効化
            DB::commit();
            return $question_id;
        }
    }

    //問題を登録する関数(ステータス:編集中、バリデーションあり、完成状態で登録)
    public function uploadQuestion(UploadQuestionRequest $request){
        return $this->saveQuestion($request);
    }
}
