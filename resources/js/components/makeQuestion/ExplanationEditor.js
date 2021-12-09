import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';

function ExplanationEditor(props) {
    const answerTextRegister = props.register("answer_text", {
        required: "入力してください",
        maxLength: {value:3000, message:'3000文字以内で入力してください'}
    })
    return (
        <div>
            <div className="bg-dark text-white">解説文</div>
                <TextareaAutosize
                    minRows={3}
                    className={`col ${props.errors.answer_text ? 'invalid' : 'valid'}`}
                    {...answerTextRegister}
                />
                {props.errors.answer_text && <span className="text-danger">{props.errors.answer_text.message}</span>}
        </div>
    );
}

export default ExplanationEditor;