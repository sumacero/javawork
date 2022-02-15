import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question';
import Choices from './Choices';
import ChoicesForm from './ChoicesForm';
import Result from './Result';

function QuestionPage() {
    const [ question_id, setQuestion_id] = useState(location.pathname.split('/').slice(-1)[0]);
    const [ question, setQuestion] = useState("");
    //const [ choices, setChoices ] = useState([]);
    //const [ answer, setAnswer] = useState("");
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceId, setSelectedChoiceId] = useState(0);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const [ correctSymbol, setCorrectSymbol] =useState("");
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('../get-qa/' + question_id);
            const dbData = result.data.dbData;
            setQuestion(JSON.parse(JSON.stringify(dbData)));
            const correctChoice = dbData.choices.find((choice)=>choice.choice_id === dbData.answer.choice_id);
            setCorrectSymbol(correctChoice.choice_symbol);
        };
        fetchData();
    },[]);
    const clickAnswerButton = () =>{
        setAnsweredFlag(true);
        setCorrectFlag(question.answer.choice_id == selectedChoiceId)
    }
    return (
        <div className="container">
            {question !== "" &&
            <span>
                <Question question={question} />
                <Choices choices={question.choices}/>
                <ChoicesForm choices={question.choices} setSelectedChoiceId={setSelectedChoiceId} answeredFlag={answeredFlag}/>
                {selectedChoiceId > 0 ? 
                    <button type="button" className="btn btn-dark btn-block mb-3" onClick={clickAnswerButton} disabled={answeredFlag}>回答</button> 
                : null}
                <Result answer={question.answer} answeredFlag={answeredFlag} correctFlag={correctFlag} correctSymbol={correctSymbol}/>
            </span>
            }
        </div>
    );
}


if (document.getElementById('question-page')) {
    ReactDOM.render(<QuestionPage />,document.getElementById('question-page'));
}

