<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadQuestionRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Question;
use App\Choice;
use App\Answer;

class EditQuestionController extends Controller
{
    public function index(Request $request){
        $question_id = $request->question_id;
        return view('edit_question')->with('question_id', $question_id);
    }
    public function editQuestion(UploadQuestionRequest $request){
        $loginUserId = Auth::user()->id;
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $question_id = $request->input('question_id');
        $question_text = $request->input('question_text');
        $answer_text = $request->input('answer_text');
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
        $correct_choice_id = -1;
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
    }
}
