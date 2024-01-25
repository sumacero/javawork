<?php

use Illuminate\Database\Seeder;

class ExaminationStatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'status_name' => '未完了',
        ];
        DB::table('examination_statuses')->insert($param);
        $param = [
            'status_name' => '完了',
        ];
        DB::table('examination_statuses')->insert($param);
    }
}
