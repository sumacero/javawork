<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Category;
use App\Subcategory;
use App\Question;
use App\Choice;
use App\Answer;
use Illuminate\Support\Facades\Auth;

class ConfirmQuestionController extends Controller
{
    public function index(Request $request){
        $question_id = $request->input('question_id');
        return view('confirm_question')->with('question_id', $question_id);
    }
    public function commitQuestion(Request $request){
        $question_id = $request->input('question_id');
        $question = Question::find($question_id);
        $question->status_id = 1; //1:公開,2:編集中
        $question->save();
    }
}
