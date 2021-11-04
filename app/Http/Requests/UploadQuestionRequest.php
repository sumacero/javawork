<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadQuestionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        if($this->path() == 'upload-question' || $this->path() == 'edit-question'){
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
            'choice_text.A' => 'required|max:2000',
            'choice_text.B' => 'required|max:2000',
            'choice_text.C' => 'sometimes|required|max:2000',
            'choice_text.D' => 'sometimes|required|max:2000',
            'choice_text.E' => 'sometimes|required|max:2000',
            'choice_text.F' => 'sometimes|required|max:2000',
            'choice_text.G' => 'sometimes|required|max:2000',
            'choice_text.H' => 'sometimes|required|max:2000',
            'answer_text' => 'required|max:6000',
            'category_id' => 'required|integer',
            'subcategory_id'=>'required|integer',
            'correct_choice_symbol'=>'required',
        ];
    }
}
