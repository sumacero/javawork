<?php

use Illuminate\Database\Seeder;

class SubcategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //JAVAブロンズ
        $param = [
            'category_id' => '1',
            'subcategory_name' => 'Java言語のプログラムの流れ',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => 'データの宣言と使用',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => '演算子と分岐文',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => 'ループ文',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => '配列の操作',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => 'オブジェクト指向の概念',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => 'クラスの定義とオブジェクトの使用',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => '継承とポリモフィズム',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '1',
            'subcategory_name' => 'その他',
        ];
        DB::table('subcategories')->insert($param);

        //JAVAシルバー
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'Javaテクノロジと開発環境についての理解',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => '簡単なJavaプログラムの作成',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'Javaの基本データ型と文字列の操作',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => '演算子と制御構造',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => '配列の操作',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'クラスの宣言とインスタンスの使用',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'メソッドの作成と使用',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'カプセル化の適用',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => '継承による実装の再利用',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'インタフェースによる抽象化',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => '例外処理',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'モジュール・システム',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '2',
            'subcategory_name' => 'その他',
        ];
        DB::table('subcategories')->insert($param);

        //JAVAゴールド
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'Javaの基礎',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => '例外処理とアサーション',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'Javaのインタフェース',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => '汎用とコレクション',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => '関数型インタフェースとラムダ式',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'JavaストリームAPI',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => '組込み関数型インタフェース',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'ストリームに対するラムダ演算',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'モジュール型アプリケーションに移行する',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'モジュール型アプリケーションにおけるサービス',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => '並列処理',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => '並列ストリーム',
        ];
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'I/O（基本およびNIO2',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'Java SEアプリケーションにおけるセキュア・コーディング',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'JDBCによるデータベース・アプリケーション',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'ローカライズ',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'アノテーション',
        ];
        DB::table('subcategories')->insert($param);
        $param = [
            'category_id' => '3',
            'subcategory_name' => 'その他',
        ];
        DB::table('subcategories')->insert($param);
    }
}
