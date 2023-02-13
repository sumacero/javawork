<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class AnswerLog extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "answer_log_id";
    //belongsTo設定
    public function user(){
        return $this->belongsTo('App\User','id');
    }
    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }
}
