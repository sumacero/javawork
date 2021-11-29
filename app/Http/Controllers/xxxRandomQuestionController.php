<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Choice;
use App\Answer;

class RandomQuestionController extends Controller
{
    public function index(Request $request){
        $subcategoryChecks = $request->input('subcategories');
        $subcategoryIds = array();
        foreach ($subcategoryChecks as $key => $value) {
            array_push($subcategoryIds, $key);
        }
        return view('random_question', compact('subcategoryIds'));

    }
    public function getQA($subcategoryIds){
        $questionIds = Question::whereIn('subcategory_id', $subcategoryIds)->pluck('question_id');
        $randomIndex = mt_rand(0, count($questionIds)-1);
        $question_id = $questionIds[$randomIndex];
        $question = Question::with('status','subcategory.category')->find($question_id);
        $choices = Choice::where('question_id', $question_id)->get();
        $answer = Answer::where('question_id', $question_id)->first();
        $dbData = compact('question', 'choices', 'answer');
        return response()->json(['dbData' => $dbData]);
    }
}
