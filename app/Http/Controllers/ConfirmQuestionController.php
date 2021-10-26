<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\ConfirmQuestionRequest;
use App\User;
use App\Category;
use App\Subcategory;
use App\Question;
use App\Choice;
use App\Answer;
use Illuminate\Support\Facades\Auth;

class ConfirmQuestionController extends Controller
{
    public function uploadQuestion(ConfirmQuestionRequest $request){
        $loginUserId = Auth::user()->id;
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $question_text = $request->input('question_text');
        $answer_text = $request->input('answer_text');
        $subcategory_id = $request->input('subcategory_id');
        $correct_choice_symbol = $request->input('correct_choice_symbol');
        $symbol = "ABCDEFGH";
        $choice_text_array = [];
        for($i = 0; $i < strlen($symbol); $i++) {
            $propName = "choice_text_" . $symbol[$i];
            $choice_text = $request->input($propName);
            if(isset($choice_text)){
                $choice_text_array[$symbol[$i]] = $choice_text;
            }
        }
        //------------------------------------------------------------------
        //レコードの追加
        //------------------------------------------------------------------
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
        $correct_choice_id = -1;
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
        return view('confirm_question', compact('question', 'choices', 'answer'));
    }
}
