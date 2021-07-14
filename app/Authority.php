<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Authority extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "authority_id";

    //hasMany設定
    public function users(){
        return $this->hasMany('App\User');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('authority_id',function(Builder $builder){
            $builder->orderBy('authority_id','asc');
        });
    }
}
