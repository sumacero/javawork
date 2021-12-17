<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use App\Question;
use App\Choice;
use App\Answer;
class DeleteQuestionController extends Controller
{
    public function deleteQuestion(Request $request){
        //------------------------------------------------------------------
        //リクエストデータの読み取り
        //------------------------------------------------------------------
        $question_id = $request->input('question_id');
        //------------------------------------------------------------------
        //レコードの削除
        //------------------------------------------------------------------
        DB::beginTransaction();
        //answersテーブル
        Answer::where('question_id', $question_id)->first()->delete();
        //choicesテーブル
        Choice::where('question_id', $question_id)->delete(); //問題に対する選択肢を全削除
        //questionsテーブル
        Question::find($question_id)->delete();
        DB::commit();
    }
}
