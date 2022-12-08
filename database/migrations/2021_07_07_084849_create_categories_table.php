<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('categories', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('category_id');
            $table->bigInteger('workbook_id')->unsigned();
            $table->string('category_name');
            $table->timestamps();
            // 外部キー設定
            $table->foreign('workbook_id')->references('workbook_id')->on('workbooks');
            // 複合列のユニーク設定
            $table->unique(['workbook_id','category_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('categories');
    }
}
