<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Status;

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
        return response()->json(['questions' => $questions]);
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

        $questions = Question::with('status','subcategory.category','createuser','updateuser');
        if(count($statusIds)>0){
            $questions = $questions->whereIn('status_id', $statusIds);
        }
        if(count($subcategoryIds)>0){
            $questions = $questions->whereIn('subcategory_id', $subcategoryIds);
        }
        $questions = $questions->paginate(20);
        return response()->json(['questions' => $questions]);
    }
}
