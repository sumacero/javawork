<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExaminationQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examination_questions', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('examination_question_id');
            $table->bigInteger('examination_id')->unsigned();
            $table->bigInteger('question_id')->unsigned();
            $table->boolean('is_answered');
            $table->boolean('is_answered_correct');
            $table->boolean('is_marked');
            $table->timestamps();
            // 外部キー設定
            // 親テーブルのレコードが削除された場合、このレコードも削除する。
            $table->foreign('examination_id')->references('examination_id')->on('examinations')->onDelete('cascade');
            $table->foreign('question_id')->references('question_id')->on('questions')->onDelete('cascade');
            // 複合列のユニーク設定
            $table->unique(['examination_id', 'question_id']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examination_questions');
    }
}
