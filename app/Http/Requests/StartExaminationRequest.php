<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;
use App\Question;

class StartExaminationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if($this->path() == 'start-examination'){
            return true;
        }else{
            return false;
        }
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        $targetQuestionCount = 0;
        if($this->has('category_ids') && is_array($this->input('category_ids'))){
            $categoryIds = $this->input('category_ids');
            $targetQuestionCount = Question::whereIn('category_id', $categoryIds)->count();
        }
        $setQuestionCount = 0;
        if($this->has('set_question_count')){
            $setQuestionCount = $this->input('set_question_count');
        }
        return [
            'title' => 'required|max:100',
            'memo' => 'max:2000',
            'set_time' => 'required|integer|between:1,300',
            'set_question_count' => ['required', 'integer', "between:1,$targetQuestionCount"],
            'set_passing_score' => ['required', 'integer', "between:1,$setQuestionCount"],
            'category_ids' => 'required|array',
            'category_ids.*' => 'exists:App\Category,category_id'
        ];
    }
    public function attributes()
    {
        return [
            'title' => 'タイトル',
            'memo' => 'メモ',
            'set_time' => '試験時間',
            'set_question_count' => '出題数',
            'set_passing_score' => '合格正解数',
            'category_ids' => 'カテゴリ',
        ];
    }
    public function messages(){
        return [
            'category_ids.required' => ':attributeを選択してください。',
        ];
    }
}
