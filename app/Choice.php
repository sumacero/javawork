<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Choice extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "choice_id";

    //belongsTo設定
    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }

    //hasMany設定
    public function examinationAnswerLogs(){
        return $this->hasMany('App\ExaminationAnswerLogs', 'choice_id');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('choice_id',function(Builder $builder){
            $builder->orderBy('choice_id','asc');
        });
    }
}
