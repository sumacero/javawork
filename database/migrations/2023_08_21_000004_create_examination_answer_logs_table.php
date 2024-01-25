<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExaminationAnswerLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examination_answer_logs', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('examination_answer_log_id');
            $table->biginteger('examination_question_id')->unsigned();
            $table->biginteger('choice_id')->unsigned();
            $table->timestamps();
            // 親テーブルのレコードが削除された場合、このレコードも削除する。
            $table->foreign('examination_question_id')->references('examination_question_id')->on('examination_questions')->onDelete('cascade');
            $table->foreign('choice_id')->references('choice_id')->on('choices')->onDelete('cascade');
            // 複合列のユニーク設定
            $table->unique(['examination_question_id','choice_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examination_answer_logs');
    }
}
