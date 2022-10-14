import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import PracticeMenu from './PracticeMenu';
import QuestionArea from './QuestionArea';
import useSessionStrage from '../SessionStrage';

function RandomQuestionPage() {
    const [ started, setStarted ] = useState(false);
    const [ targetQuestionCount, setTargetQuestionCount] = useState(0);
    const [ question, setQuestion] = useState("");
    const [ checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceId, setSelectedChoiceId] = useState(0);
    const [ selectedChoiceSymbol, setSelectedChoiceSymbol] = useState("");
    const [ correctFlag, setCorrectFlag] = useState(false);
    const [ correctSymbol, setCorrectSymbol] =useState("");
    const data = {
        correctCount:0,
        wrongCount:0
    }
    const [ score, setScore] = useSessionStrage("score", data);

    const fetchTargetQuestionCount = async () => {
        const result = await axios.post('get-target-question-count', checkedSubcategories);
        const data = result.data.dbData;
        setTargetQuestionCount(data.targetQuestionCount);
    };
    const fetchRandomQA = async () => {
        const result = await axios.post('random-get-qa', checkedSubcategories);
        const data = result.data.dbData;
        setQuestion(JSON.parse(JSON.stringify(data)));
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
        fetchRandomQA();
        setScore(data);
    }
    const clickNextButton = () => {
        setAnsweredFlag(false);
        setSelectedChoiceId(0);
        setSelectedChoiceSymbol("");
        setCorrectFlag(false);
        fetchRandomQA();
        window.scrollTo(0, 0);
    }
    return (
        <div className="container">
            { started && question !== "" &&
                <QuestionArea
                    question={question}
                    setAnsweredFlag={setAnsweredFlag}
                    answeredFlag={answeredFlag}
                    setSelectedChoiceId={setSelectedChoiceId}
                    selectedChoiceId={selectedChoiceId}
                    setSelectedChoiceSymbol={setSelectedChoiceSymbol}
                    selectedChoiceSymbol={selectedChoiceSymbol}
                    clickStartButton={clickStartButton}
                    clickNextButton={clickNextButton}
                    setCorrectFlag={setCorrectFlag}
                    correctFlag={correctFlag}
                    correctSymbol={correctSymbol}
                    setScore={setScore}
                    score={score}
                />
            }
            { !started &&
                <PracticeMenu
                    targetQuestionCount={targetQuestionCount}
                    setCheckedSubcategories={setCheckedSubcategories}
                    checkedSubcategories={checkedSubcategories}
                    setQuestion={setQuestion}
                    clickStartButton={clickStartButton}
                />
            }
            <button className="btn btn-success" onClick={()=>console.log(window.pageYOffset)}>
                現在のカーソル位置
            </button>
        </div>
    );
}


if (document.getElementById('random-question-page')) {
    ReactDOM.render(<RandomQuestionPage />,document.getElementById('random-question-page'));
}

