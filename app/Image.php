<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Image extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "image_id";

    //belongsTo設定
    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('image_id',function(Builder $builder){
            $builder->orderBy('image_id','asc');
        });
    }
}
