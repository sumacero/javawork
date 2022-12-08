<?php

use Illuminate\Database\Seeder;

class AnswerLogsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'user_id' => '1',
            'question_id' => '1',
            'answer_count' => '0',
            'correct_count' => '0',
        ];
        DB::table('answer_logs')->insert($param);
    }
}
