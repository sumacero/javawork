<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Workbook;
use App\Category;

class RandomQuestionSettingController extends Controller
{
    public function index(){
        return view('random_question_setting');
    }
    public function getCategoriesWithQuestionCounts(){
        $workbooks = Workbook::all();
        $categories = Category::all();
        // $categoryレコードに問題数を追加
        $categories->map(function ($category) {
            $category['question_count'] = Question::where('status_id', 1)
                ->where('category_id', $category['category_id'])->count();
            return $category;
        });
        // $workbooksレコードに問題数を追加
        $workbooks->map(function ($workbook) use($categories) {
            $workbook['question_count'] = $categories->filter(function ($category) use($workbook){
                return $workbook['workbook_id'] === $category['workbook_id'];
            })->map(function ($category) {
                return $category['question_count'];
            })->sum();
            return $workbook;
        });
        $dbData = compact('workbooks', 'categories');
        return response()->json(['dbData' => $dbData]);
    }
    /*
    public function getTargetQuestionCount(Request $request){
        $targetCategortIds = $request->input();
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $targetCategortIds)->pluck('question_id');
        return response()->json(['target_question_count' => count($questionIds)]);
    }
    */
}
