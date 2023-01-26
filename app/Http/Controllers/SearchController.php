<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Question;
use App\Image;
use App\Status;
use App\Choice;

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
        $questions = Question::with('status','category.workbook','createuser','updateuser','choices','images')->paginate(5);
        // image_fileプロパティを追加
        foreach($questions as &$question){
            $questionId = $question["question_id"];
            foreach ($question["images"] as &$image) {
                $imagePath = $image["image_path"];
                $mimeType = \Storage::disk('sftp')->getMimeType($imagePath);
                $imageFile = \Storage::disk('sftp')->get($imagePath);
                $imageFile = "data:".$mimeType.";base64,".base64_encode($imageFile);
                $image["image_file"] = $imageFile;
            }
            unset($image);
        }
        unset($question);
        return response()->json(['dbData' => $questions]);
    }

    public function filterQuestions(Request $request){
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $statudIds = json_decode($request->input('status_ids'),true);
        $categoryIds = json_decode($request->input('category_ids'),true);
        $keyword = $request->input('keyword');
        $splitKeyword = explode(" ", $keyword);
        $keywordList = [];
        foreach ($splitKeyword as $keyword) {
            if ($keyword != " " && $keyword != ""){
                $keywordList[] = $keyword;
            }
        }
        $questions = Question::with('status','category.workbook','createuser','updateuser','choices', 'images');
        if(count($statudIds)>0){
            $questions = $questions->whereIn('status_id', $statudIds);
        }
        if(count($categoryIds)>0){
            $questions = $questions->whereIn('category_id', $categoryIds);
        }
        if(count($keywordList)>0){
            $keywordFilterQuestionIds = DB::table('questions')
                ->where(function($query) use($keywordList){
                    foreach ($keywordList as $keyword) {
                        $query->where(DB::raw('CONCAT(questions.question_text, " ", questions.answer_text)'), 'like', '%'.$keyword.'%');
                    }
                })
                ->pluck('questions.question_id');
            $questions = $questions->whereIn('question_id', $keywordFilterQuestionIds);
        }
        $questions = $questions->paginate(5);
        // image_fileプロパティを追加
        foreach($questions as &$question){
            $questionId = $question["question_id"];
            foreach ($question["images"] as &$image) {
                $imagePath = $image["image_path"];
                $mimeType = \Storage::disk('sftp')->getMimeType($imagePath);
                $imageFile = \Storage::disk('sftp')->get($imagePath);
                $imageFile = "data:".$mimeType.";base64,".base64_encode($imageFile);
                $image["image_file"] = $imageFile;
            }
            unset($image);
        }
        unset($question);
        return response()->json(['dbData' => $questions]);
    }
}
