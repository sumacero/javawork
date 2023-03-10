<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;
use App\Question;
use App\Image;
use App\Choice;
use App\Workbook;
use App\AnswerLog;

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
    public function getPrevNextQuestionId($question_id){
        $question = Question::with('status','category.workbook','choices')->find($question_id);
        $questionNumber = $question->question_number;
        $categoryId = $question->category_id;
        $workbookId = $question->category->workbook_id;
        // 前の問題のidを検索
        $prevQuesitonId = -1;
        // 同じカテゴリで前の問題番号の問題を検索
        $prevQuestion = Question::with('status','category.workbook','choices')
            ->where('category_id', $categoryId)->where('question_number', $questionNumber - 1)
            ->first();
        // 上記の問題が存在しない場合
        if ($prevQuestion === null) {
            // 同じワークブック内の前のカテゴリで末尾の問題番号を検索
            $prevQuestion = Question::with('status','category.workbook','choices')
                ->whereHas('category', function($query) use ($workbookId) {
                    $query->where('workbook_id', $workbookId);
                })
                ->where('category_id', $categoryId - 1)
                ->orderBy('question_number', 'desc')
                ->first();
        }
        if($prevQuestion !== null){
            $prevQuesitonId = $prevQuestion->question_id;
        }
        // 次の問題のidを検索
        $nextQuestionId = -1;
        // 同じカテゴリで次の問題番号の問題を検索
        $nextQuestion = Question::with('status','category.workbook','choices')
            ->where('category_id', $categoryId)->where('question_number', $questionNumber + 1)
            ->first();
        // 上記の問題が存在しない場合
        if ($nextQuestion === null) {
            // 同じワークブック内の次のカテゴリで先頭の問題番号を検索
            $nextQuestion = Question::with('status','category.workbook','choices')
                ->whereHas('category', function($query) use ($workbookId){
                    $query->where('workbook_id', $workbookId);
                })
                ->where('category_id', $categoryId + 1)
                ->orderBy('question_number', 'asc')
                ->first();
        }
        if($nextQuestion !== null){
            $nextQuestionId = $nextQuestion->question_id;
        }
        return response()->json(['prevQuestionId' => $prevQuesitonId, 'nextQuestionId' => $nextQuestionId]);
    }
}
