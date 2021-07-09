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
            'choice_symbol' => 'A',
            'choice_text' => '言語未経験者向けの入門資格。Java言語を使用したオブジェクト指向プログラミングの基本的な知識を有することを評価する。',
        ];
        DB::table('choices')->insert($param);        
        $param = [
            'question_id' => '1',
            'choice_symbol' => 'B',
            'choice_text' => 'Javaアプリケーション開発に必要とされる基本的なプログラミング知識を有し、上級者の指導のもとで開発作業を行うことができる開発初心者向け資格。',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'choice_symbol' => 'C',
            'choice_text' => '設計者の意図を正しく理解して独力で機能実装が行える中上級者向け資格。Javaアプリケーション開発に必要とされる汎用的なプログラミング知識を有し、設計者の意図を正しく理解して独力で機能実装が行える能力を評価する。',
        ];
        DB::table('choices')->insert($param);
        $param = [
            'question_id' => '1',
            'choice_symbol' => 'D',
            'choice_text' => 'オブジェクト指向に基づく分析・設計（UML）により業務システムの流れを把握し、変更仕様に従ってプログラムの保守ができる能力を評価する',
        ];
        DB::table('choices')->insert($param);

    }
}
