<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMylistsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mylists', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('mylist_id');
            $table->bigInteger('mylistdir_id')->unsigned();
            $table->bigInteger('question_id')->unsigned();
            $table->timestamps();
            // 外部キー設定
            // 親テーブルのレコードが削除された場合、このレコードも削除する。
            $table->foreign('mylistdir_id')->references('mylistdir_id')->on('mylistdirs')->onDelete('cascade');
            $table->foreign('question_id')->references('question_id')->on('questions')->onDelete('cascade');
            // 複合列のユニーク設定
            $table->unique(['mylistdir_id', 'question_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mylists');
    }
}
