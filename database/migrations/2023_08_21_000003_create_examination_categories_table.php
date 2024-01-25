<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExaminationCategoriesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examination_categories', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('examination_category_id');
            $table->bigInteger('examination_id')->unsigned();
            $table->bigInteger('category_id')->unsigned();
            $table->timestamps();
            // 外部キー設定
            // 親テーブルのレコードが削除された場合、このレコードも削除する。
            $table->foreign('examination_id')->references('examination_id')->on('examinations')->onDelete('cascade');
            $table->foreign('category_id')->references('category_id')->on('categories')->onDelete('cascade');
            // 複合列のユニーク設定
            $table->unique(['examination_id', 'category_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examination_categories');
    }
}
