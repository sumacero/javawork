import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';

function QuestionEditor(props) {
    const questionTextRegister = props.register("questionText", {
        required: "入力してください",
        maxLength: {value:3000, message:'3000文字以内で入力してください'}
    })
    return (
        <div>
            <div>問題文</div>
            <TextareaAutosize
                className={`col ${props.errors.questionText ? 'invalid' : 'valid'}`}
                {...questionTextRegister}
            />
            {props.errors.questionText && <span className="text-danger">{props.errors.questionText.message}</span>}
        </div>
    );
}

export default QuestionEditor;