<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSubcategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subcategories', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('subcategory_id');
            $table->bigInteger('category_id')->unsigned();
            $table->string('subcategory_name');
            $table->timestamps();
            // 外部キー設定
            $table->foreign('category_id')->references('category_id')->on('categories');
            // 複合列のユニーク設定
            $table->unique(['category_id','subcategory_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subcategories');
    }
}
