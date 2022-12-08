<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMylistdirsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mylistdirs', function (Blueprint $table) {
            // 列の定義
            $table->bigIncrements('mylistdir_id');
            $table->bigInteger('user_id')->unsigned();
            $table->string('mylistdir_name');
            $table->boolean('is_open');
            $table->timestamps();
            // 外部キー設定
            $table->foreign('user_id')->references('id')->on('users');
            // 複合列のユニーク設定
            $table->unique(['user_id', 'mylistdir_name']);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('mylistdirs');
    }
}
