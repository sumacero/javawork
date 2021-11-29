<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Choice;
use App\Answer;

class RandomQuestionController extends Controller
{
    public function index(){
        return view('random_question');
    }
    public function getQA(Request $request){
        $targetSubcategories = $request->input();
        $subcategoryIds = array();
        foreach ($targetSubcategories as $key => $subcategory) {
            array_push($subcategoryIds, $subcategory["subcategory_id"]);
        }
        $questionIds = Question::whereIn('subcategory_id', $subcategoryIds)->pluck('question_id');
        $randomIndex = mt_rand(0, count($questionIds)-1);
        $question_id = $questionIds[$randomIndex];
        $question = Question::with('status','subcategory.category')->find($question_id);
        $choices = Choice::where('question_id', $question_id)->get();
        $answer = Answer::where('question_id', $question_id)->first();
        $dbData = compact('question', 'choices', 'answer');
        /*
        print("<br/>");
        print("<p>乱数値：".$randomIndex."</p>");
        print("<p>乱数値question_id：".$questionIds[$randomIndex]."</p>");
        */
        return response()->json(['dbData' => $dbData]);
    }
}
