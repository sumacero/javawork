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
        ];
        DB::table('choices')->insert($param);        
        $param = [
            'question_id' => '1',
            'is_correct' => '0',
            'choice_symbol' => 'B',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'is_correct' => '1',
            'choice_symbol' => 'C',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'is_correct' => '1',
            'choice_symbol' => 'D',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'is_correct' => '0',
            'choice_symbol' => 'E',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '2',
            'is_correct' => '0',
            'choice_symbol' => 'A',
        ];
        DB::table('choices')->insert($param);        
        $param = [
            'question_id' => '2',
            'is_correct' => '1',
            'choice_symbol' => 'B',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '2',
            'is_correct' => '0',
            'choice_symbol' => 'C',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '2',
            'is_correct' => '0',
            'choice_symbol' => 'D',
        ];
        DB::table('choices')->insert($param);
    }
}
