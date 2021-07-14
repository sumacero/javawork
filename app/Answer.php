<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Answer extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "answer_id";

    //belongsTo設定
    public function choice(){
        return $this->belongsTo('App\Choice','choice_id');
    }
    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('answer_id',function(Builder $builder){
            $builder->orderBy('answer_id','asc');
        });
    }
}
