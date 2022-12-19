<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Image;
use App\Choice;
use App\Workbook;

class RandomQuestionController extends Controller
{
    public function index(){
        return view('random_question');
    }
    public function getTargetQuestionCount(Request $request){
        $targetCategories = $request->input();
        $categoryIds = array();
        foreach ($targetCategories as $key => $category) {
            array_push($categoryIds, $category["category_id"]);
        }
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $categoryIds)->pluck('question_id');
        $targetQuestionCount = count($questionIds);
        $dbData = compact('targetQuestionCount');
        return response()->json(['dbData' => $dbData]);
    }
    public function getQuestion(Request $request){
        $targetCategories = $request->input();
        $categoryIds = array();
        foreach ($targetCategories as $key => $category) {
            array_push($categoryIds, $category["category_id"]);
        }
        $questionIds = Question::where('status_id', 1)->whereIn('category_id', $categoryIds)->pluck('question_id');
        $targetQuestionCount = count($questionIds);
        if($targetQuestionCount > 0){
            $randomIndex = mt_rand(0, count($questionIds)-1);
            $question_id = $questionIds[$randomIndex];
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
        return response()->json(['error' => 'error']);
    }
}
