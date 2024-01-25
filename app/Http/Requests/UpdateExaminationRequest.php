<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Http\Request;

class UpdateExaminationRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        /*
        if($this->path() == '/examination-result/update-examination'){
            return true;
        }else{
            return false;
        }
        */
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'examination_id' => 'required',
            'title' => 'required|max:100',
            'memo' => 'max:2000',
        ];
    }
    public function attributes()
    {
        return [
            'title' => 'タイトル',
            'memo' => 'メモ',
        ];
    }
}
