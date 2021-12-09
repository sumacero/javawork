<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAnswersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('answers', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('answer_id');
            $table->biginteger('question_id')->unsigned()->unique();
            $table->biginteger('choice_id')->unsigned()->unique()->nullable();
            $table->text('answer_text');
            $table->timestamps();
            // 外部キー設定
            $table->foreign('question_id')->references('question_id')->on('questions');
            $table->foreign('choice_id')->references('choice_id')->on('choices');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('answers');
    }
}
