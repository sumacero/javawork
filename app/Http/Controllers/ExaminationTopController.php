<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use App\Question;
use App\Choice;
use App\Examination;
use App\ExaminationStatus;
use App\ExaminationQuestion;
use App\ExaminationCategory;
use App\ExaminationAnswerLog;
use Carbon\Carbon;

class ExaminationTopController extends Controller
{
    public function index(Request $request){
        return view('examination_top');
    }
    public function getExaminationLog(Request $request){
        $loginUserId = Auth::user()->id;
        $examinations = Examination::with(
            'examinationStatus',
            'examinationQuestions',
        )->where('user_id', $loginUserId)->orderBy('started_at', 'desc')->paginate(20);
        foreach($examinations as &$examination){
            $correctAnswerCount = $examination['examinationQuestions']->where('is_answered_correct', true)->count();
            $questionCount = $examination['examinationQuestions']->count();
            $correctAnswerRate = 0.0;
            if ($questionCount > 0){
                $correctAnswerRate = round($correctAnswerCount / $questionCount * 100, 1);
            }
            $examination['correct_answer_rate'] = $correctAnswerRate;
            $examination['is_passing'] = $correctAnswerCount >= $examination->set_passing_score;
        }
        unset($examination);
        return response()->json(['dbData' => $examinations]);
    }
}