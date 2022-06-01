<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Mylist extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "mylist_id";
    //belongsTo設定
    public function mylistdir(){
        return $this->belongsTo('App\Mylistdir','mylistdir_id');
    }
    public function question(){
        return $this->belongsTo('App\Question','question_id');
    }


}
