<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Question extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "question_id";

    //hasMany設定
    public function choices(){
        return $this->hasMany('App\Choice', 'question_id');
    }
    public function images(){
        return $this->hasMany('App\Image', 'question_id');
    }

    //belongsTo設定
    public function status(){
        return $this->belongsTo('App\Status','status_id');
    }
    public function category(){
        return $this->belongsTo('App\Category','category_id');
    }
    public function createuser(){
        //外部キー:create_user_id, 参照されるキー:id
        return $this->belongsTo('App\User','create_user_id', 'id');
    }
    public function updateuser(){
        //外部キー:create_user_id, 参照されるキー:id
        return $this->belongsTo('App\User','update_user_id', 'id');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('question_id',function(Builder $builder){
            $builder->orderBy('questions.question_id','asc');
        });
    }
}
