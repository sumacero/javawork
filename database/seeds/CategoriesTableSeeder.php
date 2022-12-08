<?php

use Illuminate\Database\Seeder;

class CategoriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        //Javaシルバー徹底攻略
        $param = [
            'workbook_id' => '1',
            'category_name' => '第1章 簡単なJavaプログラムの作成',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第2章 Javaの基本データ型と文字列操作',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第3章 演算子と判定構造',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第4章 制御構造',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第5章 配列の操作',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第6章 インスタンスとメソッド',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第7章 クラスの継承、インターフェース、抽象クラス',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第8章 関数型インターフェース、ラムダ式',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第9章 API',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第10章 例外処理',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第11章 モジュールシステム',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第12章 総仕上げ問題1',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '1',
            'category_name' => '第13章 総仕上げ問題2',
        ];
        DB::table('categories')->insert($param);
        //Javaゴールド徹底攻略
        $param = [
            'workbook_id' => '2',
            'category_name' => '第1章 クラスとインタフェース',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第2章 関数型インタフェースとラムダ式',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第3章 並列処理',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第4章 ストリームAPI',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第5章 入出力',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第6章 JDBCによるデータベース連携',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第7章 汎用とコレクション',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第8章 アノテーション',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第9章 例外とアサーション',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第10章 ローカライズ',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第11章 モジュール・システム',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第12章 Java SEアプリケーションにおけるセキュアコーディング',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'workbook_id' => '2',
            'category_name' => '第13章 総仕上げ問題',
        ];
        DB::table('categories')->insert($param);
    }
}
