<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(AuthoritiesTableSeeder::class);
        $this->call(UsersTableSeeder::class);
        $this->call(StatusesTableSeeder::class);
        $this->call(ExaminationStatusesTableSeeder::class);
        $this->call(WorkbooksTableSeeder::class);
        $this->call(CategoriesTableSeeder::class);
        $this->call(QuestionsTableSeeder::class);
        $this->call(ChoicesTableSeeder::class);
        $this->call(ImagesTableSeeder::class);
        $this->call(AnswerLogsTableSeeder::class);
    }
}
