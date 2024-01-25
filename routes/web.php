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
/*
|-------------------------------------------------------------------------
| 管理者以上で操作
|-------------------------------------------------------------------------
 */
Route::group(['middleware' => ['auth', 'can:admin']], function () {
    //ユーザー登録
    Route::get('register', 'Auth\RegisterController@showRegistrationForm')->name('register');
    Route::post('register', 'Auth\RegisterController@register');
    //問題編集
    Route::get('/make-question', 'MakeQuestionController@index');
    Route::post('/save-question', 'MakeQuestionController@saveQuestion');
    Route::post('/upload-question', 'MakeQuestionController@uploadQuestion');
    Route::post('/confirm-question', 'ConfirmQuestionController@index');
    Route::get('/edit-question', 'EditQuestionController@index');
    Route::post('/edit-question', 'EditQuestionController@editQuestion');
    Route::post('/delete-question', 'DeleteQuestionController@deleteQuestion');
});
/*
|-------------------------------------------------------------------------
| 登録済みユーザーで操作
|-------------------------------------------------------------------------
 */
Route::group(['middleware' => 'auth'], function () {
    Route::get('/', 'HomeController@index');
    Route::get('/home', 'HomeController@index');
    Route::get('/random-question-setting', 'RandomQuestionSettingController@index');
    Route::post('/random-question', 'RandomQuestionController@index');
    Route::get('/get-categories', 'MakeQuestionController@getCategories');
    Route::get('/get-categories-with-question-count', 'RandomQuestionSettingController@getCategoriesWithQuestionCounts');
    Route::post('/random-get-question', 'RandomQuestionController@getQuestion');
    Route::get('/question/{question_id?}', 'QuestionController@index');
    Route::get('/get-question/{question_id?}', 'QuestionController@getQuestion');
    Route::get('/get-prev-next-question-id/{question_id?}', 'QuestionController@getPrevNextQuestionId');
    Route::get('/search', 'SearchController@index');
    Route::get('/get-login-user', 'GetUserController@getUser');
    Route::get('/get-users', 'SearchController@getUsers');
    Route::get('/get-statuses', 'SearchController@getStatuses');
    Route::get('/get-questions', 'SearchController@getQuestions');
    Route::get('/filter-questions', 'SearchController@filterQuestions');

    Route::get('/examination-top', 'ExaminationTopController@index');
    Route::get('/get-examination-log', 'ExaminationTopController@getExaminationLog');

    Route::get('/examination', 'ExaminationController@index');
    Route::post('/start-examination', 'ExaminationController@startExamination');
    Route::post('/get-examination-data', 'ExaminationController@getExaminationData');
    Route::post('/get-examination-question', 'ExaminationController@getExaminationQuestion');
    Route::post('/answer-examination-question', 'ExaminationController@answerExaminationQuestion');
    Route::post('/skip-answer-examination-question', 'ExaminationController@skipAnswerExaminationQuestion');
    Route::post('/finish-examination', 'ExaminationController@finishExamination');
    Route::get('/examination-result/{examination_id?}', 'ExaminationController@resultIndex');
    Route::post('/examination-result/get-examination-result-data', 'ExaminationController@getExaminationResultData');
    Route::post('/examination-result/update-examination', 'ExaminationController@updateExamination');
    Route::post('/examination-result/delete-examination', 'ExaminationController@deleteExamination');
    Route::post('/commit-question', 'ConfirmQuestionController@commitQuestion');
    Route::post('/get-answer-log', 'AnswerLogController@getAnswerLog');
    Route::post('/update-answer-log', 'AnswerLogController@updateAnswerLog');
});




