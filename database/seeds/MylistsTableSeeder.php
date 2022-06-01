<?php

use Illuminate\Database\Seeder;

class MylistsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'mylistdir_id' => '1',
            'question_id' => '1',
        ];
        DB::table('mylists')->insert($param);
    }
}
