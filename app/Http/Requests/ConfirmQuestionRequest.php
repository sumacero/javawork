<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ConfirmQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if($this->path() == 'confirm-question'){
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
            'question_text' => 'required|max:6000',
            'choice_text_A' => 'required|max:2000',
            'choice_text_B' => 'required|max:2000',
            'choice_text_C' => 'sometimes|required|max:2000',
            'choice_text_D' => 'sometimes|required|max:2000',
            'choice_text_E' => 'sometimes|required|max:2000',
            'choice_text_F' => 'sometimes|required|max:2000',
            'choice_text_G' => 'sometimes|required|max:2000',
            'choice_text_H' => 'sometimes|required|max:2000',
            'answer_text' => 'required|max:6000',
            'category_id' => 'required|integer',
            'subcategory_id'=>'required|integer',
            'correct_choice_symbol'=>'required',
        ];
    }
}
