<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Category extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "category_id";

    //hasMany設定
    public function questions(){
        return $this->hasMany('App\Question');
    }

    //belongsTo設定
    public function workbook(){
        return $this->belongsTo('App\Workbook','workbook_id');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('category_id',function(Builder $builder){
            $builder->orderBy('category_id','asc');
        });
    }
}
