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
        /*
        $image = \Storage::disk('sftp')->get('silver/1-1/question/image1.PNG');
        $data = 'data: image/png;base64,'. base64_encode($image);
        echo '<img src="'. $data .'">';
        */
        return view('question', $param);
    }
    public function getQuestion($question_id){
        $question = Question::with('status','category.workbook','choices')->find($question_id);
        $questionImageRecords = Image::where('question_id', $question_id)->where('image_type', "question")->get();
        $answerImageRecords = Image::where('question_id', $question_id)->where('image_type', "answer")->get();
        $questionImages = [];
        foreach ($questionImageRecords as $key => $questionImageRecord) {
            $imagePath = $questionImageRecord["image_path"];
            $imageFile = \Storage::disk('sftp')->get($imagePath);
            $imageFile = base64_encode($imageFile);
            array_push($questionImages, $imageFile);
        }
        $answerImages = [];
        foreach ($answerImageRecords as $key => $answerImageRecord) {
            $imagePath = $answerImageRecord["image_path"];
            $imageFile = \Storage::disk('sftp')->get($imagePath);
            $imageFile = base64_encode($imageFile);
            array_push($answerImages, $imageFile);
        }
        return response()->json(['dbData' => $question, 'questionImages' => $questionImages, 'answerImages' => $answerImages]);
    }
}
