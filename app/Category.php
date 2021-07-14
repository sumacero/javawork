<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\builder;

class Category extends Model
{
    //primaryKeyの設定
    protected $primaryKey = "category_id";

    //hasMany設定
    public function subcategories(){
        return $this->hasMany('App\Subcategory');
    }

    //idで昇順
    protected static function boot(){
        parent::boot();
        static::addGlobalScope('category_id',function(Builder $builder){
            $builder->orderBy('category_id','asc');
        });
    }
}
