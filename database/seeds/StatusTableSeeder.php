<?php

use Illuminate\Database\Seeder;

class StatusTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'state_name' => '公開',
        ];
        DB::table('status')->insert($param);
        $param = [
            'state_name' => '編集中',
        ];
        DB::table('status')->insert($param);
    }
}
