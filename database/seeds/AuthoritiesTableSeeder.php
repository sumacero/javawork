<?php

use Illuminate\Database\Seeder;

class AuthoritiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'authority_name' => 'admin',
        ];
        DB::table('authorities')->insert($param);
        $param = [
            'authority_name' => 'guest',
        ];
        DB::table('authorities')->insert($param);
    }
}
