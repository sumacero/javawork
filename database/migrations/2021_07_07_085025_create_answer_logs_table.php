<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswerLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answer_logs', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('answer_log_id');
            $table->biginteger('user_id')->unsigned();
            $table->biginteger('question_id')->unsigned();
            $table->biginteger('answer_count')->unsigned();
            $table->biginteger('correct_count')->unsigned();
            $table->timestamps();
            // 外部キー設定
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('question_id')->references('question_id')->on('questions');
            // 複合列のユニーク設定
            $table->unique(['user_id','question_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answer_logs');
    }
}
