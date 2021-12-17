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
/*
Route::get('/', function () {
    return view('welcome');
});
*/

Auth::routes();
/*
Auth::routes([
    'register' => false, //ユーザ登録画面の無効
    'reset' => false, //パスワードリセットの無効
]);
*/
Route::get('/', 'HomeController@index');
Route::get('/home', 'HomeController@index');
Route::get('/random-question', 'RandomQuestionController@index');
Route::get('/get-categories', 'MakeQuestionController@getCategories');
Route::post('/get-target-question-count', 'RandomQuestionController@getTargetQuestionCount');
Route::post('/random-get-qa', 'RandomQuestionController@getQA');
Route::get('/question/{question_id?}', 'QuestionController@index');
Route::get('/get-qa/{question_id?}', 'QuestionController@getQA');
Route::get('/search', 'SearchController@index')->middleware('can:service');
Route::get('/make-question', 'MakeQuestionController@index')->middleware('can:service');
Route::post('/save-question', 'MakeQuestionController@saveQuestion')->middleware('can:service');
Route::post('/upload-question', 'MakeQuestionController@uploadQuestion')->middleware('can:service');
Route::post('/confirm-question', 'ConfirmQuestionController@index')->middleware('can:service');
Route::get('/edit-question', 'EditQuestionController@index')->middleware('can:service');
Route::post('/edit-question', 'EditQuestionController@editQuestion')->middleware('can:service');
Route::post('/delete-question', 'DeleteQuestionController@deleteQuestion')->middleware('can:service');
Route::get('/get-users', 'SearchController@getUsers')->middleware('can:service');
Route::get('/get-statuses', 'SearchController@getStatuses');
Route::get('/get-questions', 'SearchController@getQuestions')->middleware('can:service');
Route::post('/filter-questions', 'SearchController@filterQuestions')->middleware('can:service');
Route::post('/commit-question', 'ConfirmQuestionController@commitQuestion')->middleware('can:service');
Route::view('/test', 'test');



