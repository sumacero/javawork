<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBookmarksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bookmarks', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('bookmark_id');
            $table->biginteger('question_id')->unsigned()->unique();
            $table->biginteger('user_id')->unsigned();
            $table->timestamps();
            // 外部キー設定
            $table->foreign('question_id')->references('question_id')->on('questions');
            $table->foreign('user_id')->references('id')->on('users');
            // 複合列のユニーク設定
            $table->unique(['question_id', 'user_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bookmarks');
    }
}
