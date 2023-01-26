<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\EditQuestionRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use App\Question;
use App\Choice;
use App\Image;

class EditQuestionController extends Controller
{
    public function index(Request $request){
        $question_id = $request->question_id;
        return view('edit_question')->with('question_id', $question_id);
    }
    public function editQuestion(EditQuestionRequest $request){
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
        //レコードの更新
        //------------------------------------------------------------------
        DB::beginTransaction();
        try {
            //questionsテーブル
            $question = Question::find($questionId);
            $question->update_user_id = $loginUserId;
            $question->status_id = 2; //1:公開,2:編集中
            $question->category_id = $categoryId;
            $question->question_number = $questionNumber;
            $question->save();
            Schema::disableForeignKeyConstraints(); //一時的に外部キー制約を解除
            //choicesテーブル
            Choice::where('question_id', $questionId)->delete(); //問題に対する選択肢を全削除
            foreach ($choices as $choiceSymbol => $isCorrect) {
                $choice = new Choice;
                $choice->question_id = $questionId;
                $choice->choice_symbol = $choiceSymbol;
                $choice->is_correct = $isCorrect;
                $choice->save();
            }
            //imagesテーブル
            //問題に対する画像パスを取得
            $imagePaths=Image::select('image_path')->where('question_id', $questionId)->get();
            Image::where('question_id', $questionId)->delete(); //問題に対する画像レコードを全削除
            foreach($imagePaths as $imagePath){
                \Storage::disk('sftp')->delete($imagePath["image_path"]); //問題に対する画像ファイルを全削除
            }
            foreach ($questionImages as $key => $questionImage) {
                $fileName = $questionImage["fileName"];
                $fileExtension = pathinfo($fileName, PATHINFO_EXTENSION);
                $image = new Image;
                $image->question_id = $questionId;
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
                $image->question_id = $questionId;
                $image->image_type = "answer";
                $image->save();
                $path = "/".$image->image_id.".".$fileExtension;
                $image->image_path = $path;
                $image->save();
                $tmp = explode(",", $answerImage["dataUrl"]);
                $imageFile = base64_decode($tmp[1]);
                \Storage::disk('sftp')->put($path, $imageFile);
            }
            Schema::enableForeignKeyConstraints(); //外部キー制約を有効化
            DB::commit();
        } catch (\Exception $e) {
            DB::rollback();
            return response($e->getMessage(), 500);
        }
    }
}
