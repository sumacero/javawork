import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';

function QuestionEditor(props) {
    const questionTextRegister = props.register("question_text", {})
    return (
        <div className="row">
            <div className="col">
                <div className="bg-dark text-white">問題文</div>
                <TextareaAutosize
                    minRows={3}
                    className={`${props.errors.question_text ? 'invalid' : 'valid'}`}
                    style={{width:"100%", display:"block"}}
                    {...questionTextRegister}
                />
                {props.errors.question_text && <span className="text-danger">{props.errors.question_text.message}</span>}
            </div>
        </div>
    );
}

export default QuestionEditor;