<?php

use Illuminate\Database\Seeder;

class AnswersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'question_id' => '1',
            'choice_id' => '2',
            'answer_text' => '公式サイト”https://www.oracle.com/jp/education/certification/jse11-5570635-ja.html”からBが正解であることがわかります。',
        ];
        DB::table('answers')->insert($param);
    }
}
