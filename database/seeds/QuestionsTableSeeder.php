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
            'question_text' => 'パッケージに関する説明として、正しいものを選びなさい。(3つ選択)',
            'question_image_path' => '',
            'answer_text' => '解説文・・・',
            'answer_image_path' => '',
        ];
        DB::table('questions')->insert($param);
    }
}
