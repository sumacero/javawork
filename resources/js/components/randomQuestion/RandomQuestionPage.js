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
    const [ questionImages, setQuestionImages] = useState([]);
    const [ answerImages, setAnswerImages] = useState([]);
    const [ checkedCategories, setCheckedCategories] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceIds, setSelectedChoiceIds] = useState([]);
    const [ correctChoiceIds, setCorrectChoiceIds] =useState([]);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const data = {
        correctCount:0,
        wrongCount:0
    }
    const [ score, setScore] = useSessionStrage("score", data);

    const fetchTargetQuestionCount = async () => {
        const result = await axios.post('get-target-question-count', checkedCategories);
        const data = result.data.dbData;
        setTargetQuestionCount(data.targetQuestionCount);
    };
    const fetchRandomQuestion = async () => {
        const result = await axios.post('random-get-question', checkedCategories);
        const data = result.data;
        if(!data.error){
            setQuestion(JSON.parse(JSON.stringify(data.dbData)));
            setQuestionImages(JSON.parse(JSON.stringify(data.questionImages)));
            setAnswerImages(JSON.parse(JSON.stringify(data.answerImages)))
            if(Array.isArray(data.dbData.choices)){
                setCorrectChoiceIds(data.dbData.choices
                    .filter((choice)=>choice.is_correct === 1)
                    .map((choice)=>choice.choice_id)
                );
            }
        }
        else{
            console.log("error");
        }
    };
    useEffect(() => {
        if(checkedCategories.length>0){
            fetchTargetQuestionCount();
        }else{
            setTargetQuestionCount(0);
        }
    },[checkedCategories]);

    const clickStartButton = () => {
        setStarted(true);
        fetchRandomQuestion();
        setScore(data);
    }
    const clickNextButton = () => {
        setQuestion("");
        setAnsweredFlag(false);
        setSelectedChoiceIds([]);
        setCorrectFlag(false);
        fetchRandomQuestion();
        window.scrollTo(0, 0);
    }
    return (
        <div className="container">
            {started && question !== "" &&
                <QuestionArea
                    question={question}
                    questionImages={questionImages}
                    answerImages={answerImages}
                    setAnsweredFlag={setAnsweredFlag}
                    answeredFlag={answeredFlag}
                    setSelectedChoiceIds={setSelectedChoiceIds}
                    selectedChoiceIds={selectedChoiceIds}
                    clickStartButton={clickStartButton}
                    clickNextButton={clickNextButton}
                    setCorrectFlag={setCorrectFlag}
                    correctFlag={correctFlag}
                    correctChoiceIds={correctChoiceIds}
                    setScore={setScore}
                    score={score}
                />
            }
            { !started &&
                <PracticeMenu
                    targetQuestionCount={targetQuestionCount}
                    setCheckedCategories={setCheckedCategories}
                    checkedCategories={checkedCategories}
                    setQuestion={setQuestion}
                    clickStartButton={clickStartButton}
                />
            }
        </div>
    );
}


if (document.getElementById('random-question-page')) {
    ReactDOM.render(<RandomQuestionPage />,document.getElementById('random-question-page'));
}

