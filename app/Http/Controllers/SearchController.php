<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
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
        $keywordList = explode(" ", $keyword);

        $questions = Question::with('status','subcategory.category','createuser','updateuser');
        if(count($statusIds)>0){
            $questions = $questions->whereIn('status_id', $statusIds);
        }
        if(count($subcategoryIds)>0){
            $questions = $questions->whereIn('subcategory_id', $subcategoryIds);
        }
        if($keywordList[0] != ""){
            
            foreach ($keywordList as $keyword) {
                //問題文でフィルタ
                $questions = $questions
                ->where('question_text', 'Like', '%'.$keyword.'%')
                ->orWhereHas('answer', function($query) use($keyword) {
                    return $query->where('answer_text', 'Like', '%'.$keyword.'%');
                });
            }
        }

        $questions = $questions->paginate(20);
        $questionIds = $questions->pluck('question_id');
        $choices = Choice::whereIn('question_id', $questionIds)->get();
        $answers = Answer::whereIn('question_id', $questionIds)->get();
        $dbData = compact('questions', 'choices', 'answers');
        return response()->json(['dbData' => $dbData]);
    }
}
