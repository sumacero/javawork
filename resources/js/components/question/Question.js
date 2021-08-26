import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Question(props) {
    return (
        <div>
            <h1 className="bg-primary text-white">問題{props.question.question_id}</h1>
            <p>{props.question.question_text}</p>
        </div>
    );
}

export default Question;