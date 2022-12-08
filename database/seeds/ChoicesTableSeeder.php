<?php

use Illuminate\Database\Seeder;

class ChoicesTableSeeder extends Seeder
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
            'is_correct' => '1',
            'choice_symbol' => 'A',
            'choice_text' => '名前空間を提供する',
        ];
        DB::table('choices')->insert($param);        
        $param = [
            'question_id' => '1',
            'is_correct' => '0',
            'choice_symbol' => 'B',
            'choice_text' => 'パッケージ名にはドメイン名を逆にしたものを私用しなければならない',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'is_correct' => '1',
            'choice_symbol' => 'C',
            'choice_text' => 'アクセス制御を提供する',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'is_correct' => '1',
            'choice_symbol' => 'D',
            'choice_text' => 'クラスの分類を可能にする',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'is_correct' => '0',
            'choice_symbol' => 'E',
            'choice_text' => 'パッケージに属さないクラスもある',
        ];
        DB::table('choices')->insert($param);
    }
}
