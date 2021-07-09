<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChoicesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('choices', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('choice_id');
            $table->biginteger('question_id')->unsigned();
            $table->string('choice_symbol');
            $table->text('choice_text');
            $table->timestamps();
            // 外部キー設定
            $table->foreign('question_id')->references('question_id')->on('questions');
            // 複合列のユニーク設定
            $table->unique(['question_id', 'choice_symbol']);
            $table->unique(['question_id', 'choice_text']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('choices');
    }
}
