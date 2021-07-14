<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Status extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "status_id";

    //hasMany設定
    public function questions(){
        return $this->hasMany('App\Question');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('status_id',function(Builder $builder){
            $builder->orderBy('status_id','asc');
        });
    }
}
