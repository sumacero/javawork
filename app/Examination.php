<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Examination extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "examination_id";
    //belongsTo設定
    public function user(){
        //外部キー:create_user_id, 参照されるキー:id
        return $this->belongsTo('App\User','user_id', 'id');
    }
    public function examinationStatus(){
        return $this->belongsTo('App\ExaminationStatus','examination_status_id');
    }
    //hasMany設定
    public function examinationQuestions(){
        return $this->hasMany('App\ExaminationQuestion', 'examination_id');
    }
    public function examinationCategories(){
        return $this->hasMany('App\ExaminationCategory', 'examination_id');
    }
    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('examination_id',function(Builder $builder){
            $builder->orderBy('examination_id','asc');
        });
    }
}
