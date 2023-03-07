<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Image;
use App\Choice;
use App\Workbook;
use App\Http\Controllers\RandomQuestionSettingController;

class RandomQuestionSettingController extends Controller
{
    public function index(){
        return view('random_question_setting');
    }
    public function getTargetQuestionCount(Request $request){
        $targetCategortIds = $request->input();
        /*
        $categoryIds = array();
        foreach ($targetCategories as $key => $category) {
            array_push($categoryIds, $category["category_id"]);
        }
        */
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $targetCategortIds)->pluck('question_id');
        return response()->json(['target_question_count' => count($questionIds)]);
    }
    public function getTargetQuestionIds(Request $request){
        $targetCategories = $request->input();
        $categoryIds = array();
        foreach ($targetCategories as $key => $category) {
            array_push($categoryIds, $category["category_id"]);
        }
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $categoryIds)->pluck('question_id');
        return response()->json(['question_ids' => $questionIds]);
    }
}
