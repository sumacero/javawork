<?php

use Illuminate\Database\Seeder;

class WorkbooksTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'workbook_name' => '徹底攻略 Java SE 11 Silver 問題集 [1Z0-815] 対応',
        ];
        DB::table('workbooks')->insert($param);
        $param = [
            'workbook_name' => '徹底攻略 Java SE 11 Gold 問題集 [1Z0-816] 対応',
        ];
        DB::table('workbooks')->insert($param);
    }
}
