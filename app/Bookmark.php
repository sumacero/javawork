<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Bookmark extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "bookmark_id";

    //belongsTo設定
    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }
    public function user(){
        return $this->belongsTo('App\User','user_id');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('bookmark_id',function(Builder $builder){
            $builder->orderBy('bookmark_id','asc');
        });
    }
}
