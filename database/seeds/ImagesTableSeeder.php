<?php

use Illuminate\Database\Seeder;

class ImagesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'question_id' => '1',
            'image_path' => '/image1.PNG',
            'image_type' => 'question',
        ];
        DB::table('images')->insert($param);
        $param = [
            'question_id' => '1',
            'image_path' => '/image2.PNG',
            'image_type' => 'answer',
        ];
        DB::table('images')->insert($param);
        $param = [
            'question_id' => '1',
            'image_path' => '/image3.PNG',
            'image_type' => 'answer',
        ];
        DB::table('images')->insert($param);
        $param = [
            'question_id' => '2',
            'image_path' => '/image4.PNG',
            'image_type' => 'question',
        ];
        DB::table('images')->insert($param);
        $param = [
            'question_id' => '2',
            'image_path' => '/image5.PNG',
            'image_type' => 'answer',
        ];
        DB::table('images')->insert($param);
    }
}
