<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Question;
use App\Status;
use App\Choice;
use App\Answer;

class SearchController extends Controller
{
    public function index(){
        return view('search');
    }
    public function getUsers(){
        $users = User::all();
        return response()->json(['users' => $users]);
    }
    public function getStatuses(){
        $statuses = Status::all();
        return response()->json(['statuses' => $statuses]);
    }

    public function getQuestions(Request $request){
        $questions = Question::with('status','subcategory.category','createuser','updateuser','choices','answer');
        $questions = $questions->paginate(5);
        return response()->json(['dbData' => $questions]);
    }

    public function filterQuestions(Request $request){
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $statudIds = json_decode($request->input('status_ids'),true);
        $subcategoryIds = json_decode($request->input('subcategory_ids'),true);
        $keyword = $request->input('keyword');
        $splitKeyword = explode(" ", $keyword);
        $keywordList = [];
        foreach ($splitKeyword as $keyword) {
            if ($keyword != " " && $keyword != ""){
                $keywordList[] = $keyword;
            }
        }
        $questions = Question::with('status','subcategory.category','createuser','updateuser','choices','answer');
        if(count($statudIds)>0){
            $questions = $questions->whereIn('status_id', $statudIds);
        }
        if(count($subcategoryIds)>0){
            $questions = $questions->whereIn('subcategory_id', $subcategoryIds);
        }
        if(count($keywordList)>0){
            $keywordFilterQuestionIds = DB::table('questions')
                ->join('answers', 'questions.question_id', 'answers.question_id')
                ->where(function($query) use($keywordList){
                    foreach ($keywordList as $keyword) {
                        $query->where(DB::raw('CONCAT(questions.question_text, " ", answers.answer_text)'), 'like', '%'.$keyword.'%');
                    }
                })
                ->pluck('questions.question_id');
            $questions = $questions->whereIn('question_id', $keywordFilterQuestionIds);
        }
        $questions = $questions->paginate(5);
        return response()->json(['dbData' => $questions]);
    }
}
