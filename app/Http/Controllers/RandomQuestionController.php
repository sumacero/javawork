<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Image;
use App\Choice;
use App\Workbook;
use App\Http\Controllers\QuestionController;

class RandomQuestionController extends Controller
{
    public function index(){
        return view('random_question');
    }
    public function getTargetQuestionCount(Request $request){
        $targetCategories = $request->input();
        $categoryIds = array();
        foreach ($targetCategories as $key => $category) {
            array_push($categoryIds, $category["category_id"]);
        }
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $categoryIds)->pluck('question_id');
        $targetQuestionCount = count($questionIds);
        $dbData = compact('targetQuestionCount');
        return response()->json(['dbData' => $dbData]);
    }
    public function getQuestion(Request $request){
        $targetCategories = $request->input();
        $categoryIds = array();
        foreach ($targetCategories as $key => $category) {
            array_push($categoryIds, $category["category_id"]);
        }
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $categoryIds)->pluck('question_id');
        $targetQuestionCount = count($questionIds);
        if($targetQuestionCount > 0){
            $randomIndex = mt_rand(0, count($questionIds)-1);
            $question_id = $questionIds[$randomIndex];
            $questionController = new QuestionController;
            return $questionController->getQuestion($question_id);
        }
        return response()->json(['error' => 'error']);
    }
}
