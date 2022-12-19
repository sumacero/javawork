<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateQuestionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('questions', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('question_id');
            $table->biginteger('create_user_id')->unsigned();
            $table->biginteger('update_user_id')->unsigned();
            $table->biginteger('status_id')->unsigned();
            $table->biginteger('category_id')->unsigned()->nullable();
            $table->biginteger('question_number')->unsigned()->nullable();
            $table->timestamps();
            // 外部キー設定
            $table->foreign('create_user_id')->references('id')->on('users');
            $table->foreign('update_user_id')->references('id')->on('users');
            $table->foreign('status_id')->references('status_id')->on('statuses');
            $table->foreign('category_id')->references('category_id')->on('categories');
            // 複合列のユニーク設定
            $table->unique(['category_id','question_number']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('questions');
    }
}
