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
Route::get('/test-question', 'RandomQuestionController@index');
Route::get('/get-categories', 'MakeQuestionController@getCategories');
Route::post('/get-target-question-count', 'RandomQuestionController@getTargetQuestionCount');
Route::post('/random-get-qa', 'RandomQuestionController@getQA');
Route::get('/question/{question_id?}', 'QuestionController@index');
Route::get('/get-qa/{question_id?}', 'QuestionController@getQA');
Route::get('/search', 'SearchController@index')->middleware('can:service');
Route::get('/make-question', 'MakeQuestionController@index')->middleware('can:admin');
Route::post('/save-question', 'MakeQuestionController@saveQuestion')->middleware('can:admin');
Route::post('/upload-question', 'MakeQuestionController@uploadQuestion')->middleware('can:admin');
Route::post('/confirm-question', 'ConfirmQuestionController@index')->middleware('can:admin');
Route::get('/edit-question', 'EditQuestionController@index')->middleware('can:admin');
Route::post('/edit-question', 'EditQuestionController@editQuestion')->middleware('can:admin');
Route::post('/delete-question', 'DeleteQuestionController@deleteQuestion')->middleware('can:admin');
Route::get('/get-login-user', 'GetUserController@getUser');
Route::get('/get-users', 'SearchController@getUsers');
Route::get('/get-statuses', 'SearchController@getStatuses');
Route::get('/get-questions', 'SearchController@getQuestions');
Route::post('/filter-questions', 'SearchController@filterQuestions');
Route::post('/commit-question', 'ConfirmQuestionController@commitQuestion')->middleware('can:admin');
Route::view('/test', 'test');



