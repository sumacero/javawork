import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';

function ExplanationEditor(props) {
    const answerTextRegister = props.register("answerText", {
        required: "入力してください",
        maxLength: {value:3000, message:'3000文字以内で入力してください'}
    })
    return (
        <div>
            <div>解説文</div>
                <TextareaAutosize
                    className={`col ${props.errors.answerText ? 'invalid' : 'valid'}`}
                    {...answerTextRegister}
                />
                {props.errors.answerText && <span className="text-danger">{props.errors.answerText.message}</span>}
        </div>
    );
}

export default ExplanationEditor;