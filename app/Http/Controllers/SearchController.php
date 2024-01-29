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
    public function getQuestions(Request $request){
        $questions = Question::with('status','category.workbook','createuser','updateuser','choices','images')
            ->orderByRaw('category_id asc', 'question_number asc')->paginate(5);
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
        $categoryIds = json_decode($request->input('category_ids'),true);
        $questions = Question::with('status','category.workbook','createuser','updateuser','choices', 'images');
        if(count($categoryIds)>0){
            $questions = $questions->whereIn('category_id', $categoryIds);
        }
        $questions = $questions->orderByRaw('category_id asc', 'question_number asc')->paginate(5);
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
