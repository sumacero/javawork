<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Question;
use App\Http\Controllers\QuestionController;

class ExaminationSettingController extends Controller
{
    public function index(){
        return view('examination_setting');
    }

}
