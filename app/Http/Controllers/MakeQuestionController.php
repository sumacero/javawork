<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\UploadQuestionRequest;
use App\User;
use App\Workbook;
use App\Category;
use App\Question;
use App\Image;
use App\Choice;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class MakeQuestionController extends Controller
{
    public function index(){
        return view('make_question');
    }
    public function getCategories(){
        $workbooks = Workbook::all();
        $categories = Category::all();
        $dbData = compact('workbooks', 'categories');
        return response()->json(['dbData' => $dbData]);
    }
    //問題を新規作成する関数
    public function uploadQuestion(UploadQuestionRequest $request){
        $loginUserId = Auth::user()->id;
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $workbookId = $request->input('workbook_id');
        $questionId = $request->input('question_id');
        $categoryId = $request->input('category_id');
        $questionNumber = $request->input('question_number');
        $choices = $request->input('choices');
        $questionImages = $request->input('question_images');
        $answerImages = $request->input('answer_images');
        //------------------------------------------------------------------
        //レコードの追加
        //------------------------------------------------------------------
        DB::beginTransaction();
        try {
            //questionsテーブル
            $question = new Question;
            $question->create_user_id = $loginUserId;
            $question->update_user_id = $loginUserId;
            $question->status_id = 2; //1:公開,2:編集中
            $question->category_id = $categoryId;
            $question->question_number = $questionNumber;
            $question->save();
            $insertedQuestionId = $question->question_id;
            //choicesテーブル
            foreach ($choices as $choiceSymbol => $isCorrect) {
                $choice = new Choice;
                $choice->question_id = $insertedQuestionId;
                $choice->choice_symbol = $choiceSymbol;
                $choice->is_correct = $isCorrect;
                $choice->save();
            }
            //imagesテーブル
            //$dirPath = $workbookId."/".$categoryId."/".$questionNumber."/question/";
            foreach ($questionImages as $key => $questionImage) {
                $fileName = $questionImage["fileName"];
                $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                $image = new Image;
                $image->question_id = $insertedQuestionId;
                $image->image_type = "question";
                $image->save();
                $path = "/".$image->image_id.".".$fileExtension;
                $image->image_path = $path;
                $image->save();
                $tmp = explode(",", $questionImage["dataUrl"]);
                $imageFile = base64_decode($tmp[1]);
                \Storage::disk('sftp')->put($path, $imageFile);
            }
            foreach ($answerImages as $key => $answerImage) {
                $fileName = $answerImage["fileName"];
                $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                $image = new Image;
                $image->question_id = $insertedQuestionId;
                $image->image_type = "answer";
                $image->save();
                $path = "/".$image->image_id.".".$fileExtension;
                $image->image_path = $path;
                $image->save();
                $tmp = explode(",", $answerImage["dataUrl"]);
                $imageFile = base64_decode($tmp[1]);
                \Storage::disk('sftp')->put($path, $imageFile);
            }
            DB::commit();
            return $insertedQuestionId;
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }
}
