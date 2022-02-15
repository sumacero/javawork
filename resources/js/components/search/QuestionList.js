import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QuestionContent from './QuestionContent';


function QuestionList(props) {
    const clickQuestionButton = (question_id) => {
        //編集画面へ移動する
        location.href = "../question/" + question_id;
    }
    const clickEditButton = (question_id) => {
        //編集画面へ移動する
        location.href = "../edit-question?question_id=" + question_id;
    }
    return (
        <div>
            {props.questions.map((question) => 
                <div key={question.question_id}>
                    <QuestionContent
                        loginUser={props.loginUser}
                        question={question}
                    />
                </div>
            )}
        </div>
    );
}

export default QuestionList;