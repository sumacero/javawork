<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateExaminationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('examinations', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('examination_id');
            $table->bigInteger('user_id')->unsigned();
            $table->bigInteger('examination_status_id')->unsigned();
            $table->string('title');
            $table->text('memo');
            $table->bigInteger('set_time');
            $table->bigInteger('set_question_count');
            $table->bigInteger('set_passing_score');
            $table->bigInteger('score');
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
            // 外部キー設定
            $table->foreign('user_id')->references('id')->on('users');
            $table->foreign('examination_status_id')->references('examination_status_id')->on('examination_statuses');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('examinations');
    }
}
