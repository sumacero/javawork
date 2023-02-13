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
    public function index(Request $request){
        $category_ids = $request->input("category_ids");
        return view('random_question', compact('category_ids'));
    }
    public function getQuestion(Request $request){
        $categoryIds = $request->input();
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
