import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from '../question/Question';
import Choices from '../question/Choices';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';
import useSessionStrage from '../SessionStrage';

function QuestionArea(props) {
    const [ correctCount, setCorrectCount] =useState(0);
    const [ wrongCount, setWrongCount] =useState(0);
    const [ score, setScore] = useSessionStrage("score", null);

    const clickAnswerButton = () =>{
        props.setAnsweredFlag(true);
        if(props.answer.choice_id == props.selectedChoiceId){
            props.setCorrectFlag(true);
            setCorrectCount(correctCount + 1);
        }else{
            props.setCorrectFlag(false);
            setWrongCount(wrongCount + 1);
        }
        const data = {
            correctCount:correctCount,
            wrongCount:wrongCount
        }
        setScore(data);
    }
    return (
        <div className="container">
            <p className="text-right">正解:{correctCount}/不正解:{wrongCount}</p>
            <Question question={props.question}/>
            <Choices choices={props.choices}/>
            <ChoicesForm choices={props.choices} setSelectedChoiceId={props.setSelectedChoiceId} answeredFlag={props.answeredFlag}/>
            {props.selectedChoiceId > 0 ? 
                <button className="btn btn-success btn-block mb-3" onClick={clickAnswerButton} disabled={props.answeredFlag}>回答</button> 
            : null}
            <Result answer={props.answer} answeredFlag={props.answeredFlag} correctFlag={props.correctFlag} correctSymbol={props.correctSymbol}/> 
            {props.answeredFlag ?
                    <button className="btn btn-outline-dark btn-block mb-3" onClick={props.clickStartButton}>次の問題へ</button>
            : null}
        </div>
    );
}

export default QuestionArea;
