<?php

use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'authority_id' => '1',
            'name' => 'デバッグ用管理者ユーザ',
            'email' => 'test1@sumacero.com',
            'password' => bcrypt('password'),
        ];
        DB::table('users')->insert($param);
        $param = [
            'authority_id' => '2',
            'name' => 'デバッグ用ゲストユーザ',
            'email' => 'test2@sumacero.com',
            'password' => bcrypt('password'),
        ];
        DB::table('users')->insert($param);
    }
}
