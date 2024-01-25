<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class ExaminationQuestion extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "examination_question_id";
    //belongsTo設定
    public function examination(){
        return $this->belongsTo('App\Examination','examination_id');
    }
    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }
    //hasMany設定
    public function examinationAnswerLogs(){
        return $this->hasMany('App\ExaminationAnswerLog', 'examination_question_id');
    }
    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('examination_question_id',function(Builder $builder){
            $builder->orderBy('examination_question_id','asc');
        });
    }
}
