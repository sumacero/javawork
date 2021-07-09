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
        $param = [
            'category_name' => 'Java Bronze',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'category_name' => 'Java Silver',
        ];
        DB::table('categories')->insert($param);
        $param = [
            'category_name' => 'Java Gold',
        ];
        DB::table('categories')->insert($param);
    }
}
