<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\User;
use App\Question;
use App\AnswerLog;

class AnswerLogController extends Controller
{
    public function getAnswerLog(Request $request){
        $loginUserId = Auth::user()->id;
        $questionId = $request->question_id;
        $answerLog = AnswerLog::where('user_id', $loginUserId)->where('question_id', $questionId)->first();
        if (is_null($answerLog)){
           $answerLog = $this->makeAnswerLog($questionId);
        }
        return response()->json(['answerLog' => $answerLog]);
    }
    public function makeAnswerLog($questionId){
        $loginUserId = Auth::user()->id;
        DB::beginTransaction();
        try {
            $answerLog = new AnswerLog;
            $answerLog->user_id = $loginUserId;
            $answerLog->question_id = $questionId;
            $answerLog->answer_count = 0;
            $answerLog->correct_count = 0;
            $answerLog->save();
            DB::commit();
            return $answerLog;
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }

    }
    public function updateAnswerLog(Request $request){
        $answerLogId = $request->input('params')["answer_log_id"];
        $isCorrected = $request->input('params')["is_corrected"];
        $answerLog = AnswerLog::find($answerLogId);
        DB::beginTransaction();
        try {
            $answerLog->answer_count++;
            if ($isCorrected) $answerLog->correct_count++;
            $answerLog->save();
            DB::commit();
            return response()->json(['answerLog' => $answerLog]);
        } catch (\Exception $e) {
            DB::rollback();
            return response( $e->getMessage(), 500);
        }
    }
}
