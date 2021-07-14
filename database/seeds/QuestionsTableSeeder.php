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
            'subcategory_id' => '13',
            'question_text' => '"Oracle Certified Java Programmer, Silver SE 11 認定資格"について最も正しいものはどれですか。'
        ];
        DB::table('questions')->insert($param);
    }
}
