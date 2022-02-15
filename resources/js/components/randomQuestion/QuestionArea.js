import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from '../question/Question';
import Choices from '../question/Choices';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';

function QuestionArea(props) {
    let correctCount = 0;
    let wrongCount = 0;
    let data = {
        correctCount:correctCount,
        wrongCount:wrongCount
    }
    const clickAnswerButton = () =>{
        props.setAnsweredFlag(true);
        if(props.question.answer.choice_id == props.selectedChoiceId){
            props.setCorrectFlag(true);
            data = {
                correctCount:props.score.correctCount + 1,
                wrongCount:props.score.wrongCount
            }
        }else{
            props.setCorrectFlag(false);
            data = {
                correctCount:props.score.correctCount,
                wrongCount:props.score.wrongCount+1
            }
        }
        props.setScore(data);
    }
    return (
        <div className="container">
            <p className="text-right">
                正答率:{Math.round(props.score.correctCount/(props.score.correctCount+props.score.wrongCount)*1000)/10 + "%"}
                 ( 正解数:{props.score.correctCount} / 出題数:{props.score.correctCount+props.score.wrongCount} )
            </p>
            <Question question={props.question}/>
            <Choices choices={props.question.choices}/>
            <ChoicesForm choices={props.question.choices} setSelectedChoiceId={props.setSelectedChoiceId} answeredFlag={props.answeredFlag}/>
            {props.selectedChoiceId > 0 ? 
                <button className="btn btn-success btn-block mb-3" onClick={clickAnswerButton} disabled={props.answeredFlag}>回答</button> 
            : null}
            <Result answer={props.question.answer} answeredFlag={props.answeredFlag} correctFlag={props.correctFlag} correctSymbol={props.correctSymbol}/> 
            {props.answeredFlag ?
                    <button className="btn btn-outline-dark btn-block mb-3" onClick={props.clickNextButton}>次の問題へ</button>
            : null}
        </div>
    );
}

export default QuestionArea;
