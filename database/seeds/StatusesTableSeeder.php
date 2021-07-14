<?php

use Illuminate\Database\Seeder;

class StatusesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'status_name' => '公開',
        ];
        DB::table('statuses')->insert($param);
        $param = [
            'status_name' => '編集中',
        ];
        DB::table('statuses')->insert($param);
    }
}
