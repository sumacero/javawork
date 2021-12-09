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
    public function getTargetQuestionCount(Request $request){
        $targetSubcategories = $request->input();
        $subcategoryIds = array();
        foreach ($targetSubcategories as $key => $subcategory) {
            array_push($subcategoryIds, $subcategory["subcategory_id"]);
        }
        $questionIds = Question::whereIn('subcategory_id', $subcategoryIds)->pluck('question_id');
        $targetQuestionCount = count($questionIds);
        $dbData = compact('targetQuestionCount');
        return response()->json(['dbData' => $dbData]);
    }
    public function getQA(Request $request){
        $targetSubcategories = $request->input();
        $subcategoryIds = array();
        foreach ($targetSubcategories as $key => $subcategory) {
            array_push($subcategoryIds, $subcategory["subcategory_id"]);
        }
        $questionIds = Question::whereIn('subcategory_id', $subcategoryIds)->pluck('question_id');
        $targetQuestionCount = count($questionIds);
        if($targetQuestionCount == 0){
            $question = "";
            $choices = "";
            $answer = "";
        }else{
            $randomIndex = mt_rand(0, count($questionIds)-1);
            $question_id = $questionIds[$randomIndex];
            $question = Question::with('status','subcategory.category')->find($question_id);
            $choices = Choice::where('question_id', $question_id)->get();
            $answer = Answer::where('question_id', $question_id)->first();
        }
        $dbData = compact('question', 'choices', 'answer');
        return response()->json(['dbData' => $dbData]);
    }
}
