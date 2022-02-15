<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Choice;
use App\Answer;

class QuestionController extends Controller
{
    public function index($question_id){
        $param = ['question_id' => $question_id];
        return view('question', $param);
    }
    public function getQA($question_id){
        $question = Question::with('status','subcategory.category','choices','answer')->find($question_id);  
        return response()->json(['dbData' => $question]);
    }
}
