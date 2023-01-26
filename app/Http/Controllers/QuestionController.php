<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Image;
use App\Choice;
use App\Workbook;

class QuestionController extends Controller
{
    public function index($question_id){
        $param = ['question_id' => $question_id];
        return view('question', $param);
    }
    public function getQuestion($question_id){
        $question = Question::with('status','category.workbook','choices')->find($question_id);
        $questionImageRecords = Image::where('question_id', $question_id)->where('image_type', "question")->get();
        $answerImageRecords = Image::where('question_id', $question_id)->where('image_type', "answer")->get();
        $questionImages = [];
        foreach ($questionImageRecords as $key => $questionImageRecord) {
            $imagePath = $questionImageRecord["image_path"];
            $fileName = basename($imagePath);
            $mimeType = \Storage::disk('sftp')->getMimeType($imagePath);
            $imageFile = \Storage::disk('sftp')->get($imagePath);
            $imageFile = "data:".$mimeType.";base64,".base64_encode($imageFile);
            $tmpArray = array("fileName"=>$fileName,"image"=>$imageFile);
            array_push($questionImages, $tmpArray);
        }
        $answerImages = [];
        foreach ($answerImageRecords as $key => $answerImageRecord) {
            $imagePath = $answerImageRecord["image_path"];
            $fileName = basename($imagePath);
            $mimeType = \Storage::disk('sftp')->getMimeType($imagePath);
            $imageFile = \Storage::disk('sftp')->get($imagePath);
            $imageFile = "data:".$mimeType.";base64,".base64_encode($imageFile);
            $tmpArray = array("fileName"=>$fileName,"image"=>$imageFile);
            array_push($answerImages, $tmpArray);
        }
        return response()->json(['dbData' => $question, 'questionImages' => $questionImages, 'answerImages' => $answerImages]);
    }
}
