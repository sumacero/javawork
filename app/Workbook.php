<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Workbook extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "workbook_id";

    //hasMany設定
    public function categories(){
        return $this->hasMany('App\Category');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('workbook_id',function(Builder $builder){
            $builder->orderBy('workbook_id','asc');
        });
    }
}
