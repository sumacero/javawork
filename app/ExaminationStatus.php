<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class ExaminationStatus extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "examination_status_id";

    //hasMany設定
    public function examinations(){
        return $this->hasMany('App\Examination', 'examination_status_id');
    }
    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('examination_status_id',function(Builder $builder){
            $builder->orderBy('examination_status_id','asc');
        });
    }
}
