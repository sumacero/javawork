import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';

function QuestionEditor(props) {
    const questionTextRegister = props.register("question_text", {})
    return (
        <div>
            <div>問題文</div>
            <TextareaAutosize
                className={`col ${props.errors.question_text ? 'invalid' : 'valid'}`}
                {...questionTextRegister}
            />
            {props.errors.question_text && <span className="text-danger">{props.errors.question_text.message}</span>}
        </div>
    );
}

export default QuestionEditor;