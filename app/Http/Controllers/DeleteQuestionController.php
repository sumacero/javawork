<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Question;
use App\Choice;
use App\Image;
class DeleteQuestionController extends Controller
{
    public function deleteQuestion(Request $request){
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $questionId = $request->input('question_id');
        //------------------------------------------------------------------
        //レコードの削除
        //------------------------------------------------------------------
        DB::beginTransaction();
        //問題に対する画像パスを取得
        $imagePaths=Image::select('image_path')->where('question_id', $questionId)->get();
        Image::where('question_id', $questionId)->delete(); //問題に対する画像レコードを全削除
        foreach($imagePaths as $imagePath){
            \Storage::disk('sftp')->delete($imagePath["image_path"]); //問題に対する画像ファイルを全削除
        }
        //choicesテーブル
        Choice::where('question_id', $questionId)->delete(); //問題に対する選択肢を全削除
        //questionsテーブル
        Question::find($questionId)->delete();
        DB::commit();
    }
}
