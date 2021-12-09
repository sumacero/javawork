<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;

class SearchController extends Controller
{
    public function index(){
        return view('search');
    }
    public function getUsers(){
        $users = User::all();
        return response()->json(['users' => $users]);
    }
    public function getQuestions(Request $request){
        $questions = Question::with('status','subcategory.category','createuser','updateuser')->paginate(20);
        return response()->json(['questions' => $questions]);
    }
}
