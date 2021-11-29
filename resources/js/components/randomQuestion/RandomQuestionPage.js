import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PracticeMenu from './PracticeMenu';
import QuestionArea from './QuestionArea';

function RandomQuestionPage() {
    const [ started, setStarted ] = useState(false);
    const [ question, setQuestion] = useState("");
    const [ choices, setChoices ] = useState([]);
    const [ answer, setAnswer] = useState("");
    const [ checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceId, setSelectedChoiceId] = useState(0);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const clickStartButton = () => {
        const fetchData = async () => {
            const result = await axios.post('random-get-qa', checkedSubcategories);
            const data = result.data.dbData;
            setQuestion(JSON.parse(JSON.stringify(data.question)));
            setChoices(JSON.parse(JSON.stringify(data.choices)));
            setAnswer(JSON.parse(JSON.stringify(data.answer)));
        };
        fetchData();
        setQuestion("");
        setChoices([]);
        setAnswer("");
        setStarted(true);
        setAnsweredFlag(false);
        setSelectedChoiceId(0);
        setCorrectFlag(false);
    }
    return (
        <div className="container">
            { started ?
                <QuestionArea
                    question={question}
                    choices={choices}
                    answer={answer}
                    setAnsweredFlag={setAnsweredFlag}
                    answeredFlag={answeredFlag}
                    setSelectedChoiceId={setSelectedChoiceId}
                    selectedChoiceId={selectedChoiceId}
                    clickStartButton={clickStartButton}
                    setCorrectFlag={setCorrectFlag}
                    correctFlag={correctFlag}
                />
            :
                <PracticeMenu 
                    setStarted={setStarted}
                    setCheckedSubcategories={setCheckedSubcategories}
                    checkedSubcategories={checkedSubcategories}
                    setQuestion={setQuestion}
                    setChoices={setChoices}
                    setAnswer={setAnswer}
                    clickStartButton={clickStartButton}
                />
            }
        </div>
    );
}


if (document.getElementById('random-question-page')) {
    ReactDOM.render(<RandomQuestionPage />,document.getElementById('random-question-page'));
}

