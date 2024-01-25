<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class ExaminationAnswerLog extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "examination_answer_log_id";
    //belongsTo設定
    public function examinationQuestion(){
        return $this->belongsTo('App\ExaminationQuestion','examination_question_id');
    }
    public function choice(){
        return $this->belongsTo('App\Choice','choice_id');
    }
    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('examination_answer_log_id',function(Builder $builder){
            $builder->orderBy('examination_answer_log_id','asc');
        });
    }
}
