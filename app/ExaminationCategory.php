<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class ExaminationCategory extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "examination_category_id";
    //belongsTo設定
    public function examination(){
        return $this->belongsTo('App\Examination','examination_id');
    }
    public function category(){
        return $this->belongsTo('App\Category','category_id');
    }
    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('examination_category_id',function(Builder $builder){
            $builder->orderBy('examination_category_id','asc');
        });
    }
}
