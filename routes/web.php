<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();
Route::get('/home', 'HomeController@index');
Route::get('/search', 'SearchController@index');
Route::get('/make-question', 'MakeQuestionController@index');
Route::get('/get-categories', 'MakeQuestionController@getCategories');
Route::get('/get-users', 'SearchController@getUsers');
Route::get('/get-questions', 'SearchController@getQuestions');
Route::get('/question/{question_id?}', 'QuestionController@index');
Route::get('/get-qa/{question_id?}', 'QuestionController@getQA');
Route::post('/confirm-question', 'ConfirmQuestionController@uploadQuestion');



