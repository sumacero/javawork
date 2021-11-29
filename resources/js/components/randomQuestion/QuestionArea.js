import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from '../question/Question';
import Choices from '../question/Choices';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';

function QuestionArea(props) {
    const clickAnswerButton = () =>{
        props.setAnsweredFlag(true);
        props.setCorrectFlag(props.answer.choice_id == props.selectedChoiceId)
    }
    return (
        <div className="container">
            <Question question={props.question}/>
            <Choices choices={props.choices}/>
            <ChoicesForm choices={props.choices} setSelectedChoiceId={props.setSelectedChoiceId} answeredFlag={props.answeredFlag}/>
            {props.selectedChoiceId > 0 ? 
                <button type="button" className="btn btn-success btn-block mb-3" onClick={clickAnswerButton} disabled={props.answeredFlag}>回答</button> 
            : null}
            {props.answeredFlag ?
                <span>
                    <Result answer={props.answer} correctFlag={props.correctFlag}/>
                    <button onClick={props.clickStartButton}>次の問題へ</button>
                </span>
            : null}
        </div>
    );
}

export default QuestionArea;
