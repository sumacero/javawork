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
        return $this->hasMany('App\Choice');
    }
    public function bookmarks(){
        return $this->hasMany('App\Bookmark');
    }

    //hasOne設定
    Public function answer(){
        return $this->hasOne('App\Answer', 'question_id');
    }

    //belongsTo設定
    public function status(){
        return $this->belongsTo('App\Status','status_id');
    }
    public function subcategory(){
        return $this->belongsTo('App\Subcategory','subcategory_id');
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
            $builder->orderBy('question_id','asc');
        });
    }
}
