<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mylistdir extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "mylistdir_id";
    //belongsTo設定
    public function user(){
        return $this->belongsTo('App\User','user_id');
    }
    //hasMany設定
    public function mylists(){
        return $this->hasMany('App\Mylist', 'mylistdir_id');
    }
}
