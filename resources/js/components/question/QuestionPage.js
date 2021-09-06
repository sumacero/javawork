import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question';
import Choices from './Choices';
import ChoicesForm from './ChoicesForm';
import Result from './Result';

function QuestionPage() {
    const [ question_id, setQuestion_id] = useState(location.pathname.split('/').slice(-1)[0]);
    const [ question, setQuestion] = useState([]);
    const [ choices, setChoices ] = useState([]);
    const [ answer, setAnswer] = useState("");
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceId, setSelectedChoiceId] = useState(0);
    const [ correctFlag, setCorrectFlag] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/getQA/' + question_id);
            const data = result.data.dbData;
            setQuestion(JSON.parse(JSON.stringify(data.question)));
            setChoices(JSON.parse(JSON.stringify(data.choices)));
            setAnswer(JSON.parse(JSON.stringify(data.answer)));
        };
        fetchData();
    },[]);
    const clickAnswerButton = () =>{
        setAnsweredFlag(true);
        setCorrectFlag(answer.choice_id == selectedChoiceId)
    }
    
    return (
        <div className="container">
            <Question question={question}/>
            <Choices choices={choices}/>
            <ChoicesForm choices={choices} setSelectedChoiceId={setSelectedChoiceId}/>
            <button type="button" className="btn btn-primary" onClick={clickAnswerButton}>回答</button>
            {answeredFlag ? <Result answer={answer} correctFlag={correctFlag}/> : null}
        </div>
    );
}

export default QuestionPage;

ReactDOM.render(
    <QuestionPage />,
    document.getElementById('question-page')
);
