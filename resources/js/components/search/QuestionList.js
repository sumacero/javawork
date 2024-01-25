import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QuestionContent from './QuestionContent';


function QuestionList(props) {
    return (
        <div>
            {props.questions.length == 0 ?
                <div>問題が存在しません</div>
            :
            props.questions.map((question) => 
                <div key={question.question_id}>
                    <QuestionContent
                        loginUser={props.loginUser}
                        question={question}
                        getMylistdirs={props.getMylistdirs}
                        mylistdirs={props.mylistdirs}
                        addMylist={props.addMylist}
                        setActiveQuestionId={props.setActiveQuestionId}
                        setSelectedMylistdirId={props.setSelectedMylistdirId}
                        selectedMylistdirId={props.selectedMylistdirId}
                    />
                </div>
            )}
        </div>
    );
}

export default QuestionList;