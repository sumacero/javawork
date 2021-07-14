<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Subcategory extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "subcategory_id";

    //hasMany設定
    public function questions(){
        return $this->hasMany('App\Question');
    }

    //belongsTo設定
    public function categories(){
        return $this->belongsTo('App\Category','category_id');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('subcategory_id',function(Builder $builder){
            $builder->orderBy('subcategory_id','asc');
        });
    }
}
