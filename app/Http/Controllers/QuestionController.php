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
        $question = Question::with('status','subcategory.category')->find($question_id);
        $choices = Choice::where('question_id', $question_id)->get();
        $answer = Answer::where('question_id', $question_id)->first();
        $dbData = compact('question', 'choices', 'answer');
        return response()->json(['dbData' => $dbData]);
    }
}
