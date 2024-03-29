<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use App\User;
use App\Workbook;
use App\Category;
use App\Question;
use App\Image;
use App\Choice;

class UploadQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if($this->path() == 'upload-question'){
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
        return [
            'workbook_id' => 'required|integer',
            'category_id' => 'required|integer',
            'question_number'=> [
                'required',
                Rule::unique('questions', 'question_number')->where('category_id', $this->input('category_id'))
            ],
        ];
    }

    public function messages(){
        return [
            'question_number.unique' => 'この"カテゴリと問題番号"の問題は登録済みです'
        ];    
    }
}
