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
            'image_path' => 'silver/1-1/question/image1.PNG',
            'image_type' => 'question',
        ];
        DB::table('images')->insert($param);
        $param = [
            'question_id' => '1',
            'image_path' => 'silver/1-1/answer/image1.PNG',
            'image_type' => 'answer',
        ];
        DB::table('images')->insert($param);
        $param = [
            'question_id' => '1',
            'image_path' => 'silver/1-1/answer/image2.PNG',
            'image_type' => 'answer',
        ];
        DB::table('images')->insert($param);
    }
}
