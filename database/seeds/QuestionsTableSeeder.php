<?php

use Illuminate\Database\Seeder;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'create_user_id' => '1',
            'update_user_id' => '1',
            'status_id' => '1',
            'category_id' => '1',
            'question_number' => '1',
        ];
        DB::table('questions')->insert($param);
        $param = [
            'create_user_id' => '1',
            'update_user_id' => '1',
            'status_id' => '1',
            'category_id' => '1',
            'question_number' => '2',
        ];
        DB::table('questions')->insert($param);
    }
}
