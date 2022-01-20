import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PracticeMenu from './PracticeMenu';
import QuestionArea from './QuestionArea';

function RandomQuestionPage() {
    const [ started, setStarted ] = useState(false);
    const [ targetQuestionCount, setTargetQuestionCount] = useState(0);
    const [ question, setQuestion] = useState("");
    const [ choices, setChoices ] = useState([]);
    const [ answer, setAnswer] = useState("");
    const [ checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceId, setSelectedChoiceId] = useState(0);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const [ correctSymbol, setCorrectSymbol] =useState("");

    const fetchTargetQuestionCount = async () => {
        const result = await axios.post('/get-target-question-count', checkedSubcategories);
        const data = result.data.dbData;
        setTargetQuestionCount(data.targetQuestionCount);
    };
    const fetchRandomQA = async () => {
        const result = await axios.post('/random-get-qa', checkedSubcategories);
        const data = result.data.dbData;
        setQuestion(JSON.parse(JSON.stringify(data.question)));
        setChoices(JSON.parse(JSON.stringify(data.choices)));
        setAnswer(JSON.parse(JSON.stringify(data.answer)));
        if(Array.isArray(data.choices)){
            const correctChoice = data.choices.find((choice)=>choice.choice_id === data.answer.choice_id);
            setCorrectSymbol(correctChoice.choice_symbol);
        }
    };

    useEffect(() => {
        if(checkedSubcategories.length>0){
            fetchTargetQuestionCount();
        }else{
            setTargetQuestionCount(0);
        }
    },[checkedSubcategories]);

    const clickStartButton = () => {
        setStarted(true);
        setQuestion("");
        setChoices([]);
        setAnswer("");
        setAnsweredFlag(false);
        setSelectedChoiceId(0);
        setCorrectFlag(false);
        setCorrectSymbol("");
        fetchRandomQA();
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
                    correctSymbol={correctSymbol}
                />
            :
                <PracticeMenu
                    targetQuestionCount={targetQuestionCount}
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

