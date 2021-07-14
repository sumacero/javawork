<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class State extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "state_id";

    //hasMany設定
    public function questions(){
        return $this->hasMany('App\Question');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('state_id',function(Builder $builder){
            $builder->orderBy('state_id','asc');
        });
    }
}
