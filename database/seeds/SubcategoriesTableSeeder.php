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
    }
}
