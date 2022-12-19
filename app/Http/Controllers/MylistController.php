<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Mylistdir;
use App\Mylist;
use App\Http\Requests\ChangeMylistdirNameRequest;

class MylistController extends Controller
{
    public function index(){
        return view('mylist');
    }
    public function getMylistdirs(){
        $loginUserId = Auth::user()->id;
        $mylistdirs = Mylistdir::where('user_id', $loginUserId)->get();
        return response()->json(['dbData' => $mylistdirs]);
    }
    public function getMylists(Request $request){
        $mylistdirId = $request["mylistdir_id"];     
        $mylists = Mylist::with('question.status','question.category.workbook','question.choices')
            ->where('mylistdir_id', $mylistdirId);
        $mylists = $mylists->paginate(3);
        return response()->json(['dbData' => $mylists]);
    }
    public function getMylistdirsQuestion(){
        $loginUserId = Auth::user()->id;
        $mylistdirs = Mylistdir::with('mylists','mylists.question')->where('user_id', $loginUserId)->get();
        return response()->json(['dbData' => $mylistdirs]);
    }
    public function makeMylistdir(Request $request){
        $loginUserId = Auth::user()->id;
        $mylistdirsCount = Mylistdir::with('mylists','mylists.question')->where('user_id', $loginUserId)->count();
        if($mylistdirsCount >= 20){
            $error_message = "既に20件のマイリストフォルダが登録されているためこれ以上登録できません";
            return response()->json(['error' => $error_message], 500);
        } 
        $mylistdirName = $request->params["mylistdir_name"];
        DB::beginTransaction();
        $mylistdir = new Mylistdir;
        $mylistdir->user_id = $loginUserId;
        $mylistdir->mylistdir_name = $mylistdirName;
        $mylistdir->save();
        DB::commit();
        return response()->json($mylistdir);
    }
    public function addMylist(Request $request){
        $mylistdirId = $request->params["mylistdir_id"];
        $questionId = $request->params['question_id'];
        DB::beginTransaction();
        $mylist = new Mylist;
        $mylist->mylistdir_id = $mylistdirId;
        $mylist->question_id = $questionId;
        $mylist->save();
        DB::commit();
    }
    public function deleteMylist(Request $request){
        $mylistId = $request->params["mylist_id"];
        DB::beginTransaction();
        Mylist::where('mylist_id', $mylistId)->first()->delete();
        DB::commit();
    }
    public function deleteMylistdir(Request $request){
        $mylistdirId = $request->params["mylistdir_id"];
        DB::beginTransaction();
        Mylistdir::find($mylistdirId)->delete();
        DB::commit();
    }
    public function changeMylistdirName(ChangeMylistdirNameRequest $request){
        $mylistdirId = $request->params["mylistdir_id"];
        $mylistdirName = $request->params["mylistdir_name"];
        DB::beginTransaction();
        $mylistdir = Mylistdir::find($mylistdirId);
        $mylistdir->mylistdir_name =  $mylistdirName;
        $mylistdir->save();
        DB::commit();
    }
}
