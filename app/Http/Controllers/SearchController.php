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
        $questions = Question::with('status','subcategory.category','createuser','updateuser')->paginate(20);
        $questionIds = $questions->pluck('question_id');
        $choices = Choice::whereIn('question_id', $questionIds)->get();
        $answers = Answer::whereIn('question_id', $questionIds)->get();
        $dbData = compact('questions', 'choices', 'answers');
        return response()->json(['dbData' => $dbData]);
    }
    public function filterQuestions(Request $request){
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $prm = $request->input('params');
        $statuses = json_decode($prm['statuses'],true);
        $statusIds = array_column($statuses, 'status_id');
        $subcategories = json_decode($prm['subcategories'],true);
        $subcategoryIds = array_column( $subcategories, 'subcategory_id');
        $keyword = $prm['keyword'];
        $splitKeyword = explode(" ", $keyword);
        $keywordList = [];
        foreach ($splitKeyword as $keyword) {
            if ($keyword != " " && $keyword != ""){
                $keywordList[] = $keyword;
            }
        }
        $questions = Question::with('status','subcategory.category','createuser','updateuser');
        if(count($statusIds)>0){
            $questions = $questions->whereIn('status_id', $statusIds);
        }
        if(count($subcategoryIds)>0){
            $questions = $questions->whereIn('subcategory_id', $subcategoryIds);
        }
        $keywordFilterQuestionIds = DB::table('questions')
            ->join('answers', 'questions.question_id', 'answers.question_id')
            ->where(function($query) use($keywordList){
                foreach ($keywordList as $keyword) {
                    $query->where(DB::raw('CONCAT(questions.question_text, " ", answers.answer_text)'), 'like', '%'.$keyword.'%');
                }
            })
            ->pluck('questions.question_id');
        $questions = $questions
            ->whereIn('question_id', $keywordFilterQuestionIds)
            ->paginate(20);
        $questionIds = $questions->pluck('question_id');
        $choices = Choice::whereIn('question_id', $questionIds)->get();
        $answers = Answer::whereIn('question_id', $questionIds)->get();
        $dbData = compact('questions', 'choices', 'answers');
        return response()->json(['dbData' => $dbData]);
    }
}
