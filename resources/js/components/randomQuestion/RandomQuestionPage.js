import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from '../question/Question';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';
import { CSSTransition } from 'react-transition-group';

function RandomQuestionPage() {
    const overlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        flexFlow: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "100000",
    };
    const [ question, setQuestion] = useState("");
    const [ answerLog, setAnswerLog] = useState("");
    const [ questionImages, setQuestionImages] = useState([]);
    const [ answerImages, setAnswerImages] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceIds, setSelectedChoiceIds] = useState([]);
    const [ correctChoiceIds, setCorrectChoiceIds] = useState([]);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const [ isLoading, setIsLoading] = useState(false);
    let categoryIds = ($('#tmp').data('category_ids') + "").split(',');
    let questionId = -1;
    useEffect(() => {
        getRandomQuestion();
    },[]);
    const getRandomQuestion = ()=>{
        setIsLoading(true);
        let res1;
        const asyncFunc = async() => {
            // res1とres2は順番に実行される
            res1 = await axios.post('random-get-question', categoryIds);
        };
        asyncFunc().then(()=>{
            // asyncFunc実行後に処理される
            let data = res1.data;
            setQuestion(JSON.parse(JSON.stringify(data.dbData)));
            setQuestionImages(JSON.parse(JSON.stringify(data.questionImages)));
            setAnswerImages(JSON.parse(JSON.stringify(data.answerImages)))
            if(Array.isArray(data.dbData.choices)){
                setCorrectChoiceIds(data.dbData.choices
                    .filter((choice)=>choice.is_correct === 1)
                    .map((choice)=>choice.choice_id)
                );
            }
            questionId = data.dbData.question_id;
        }).finally(()=>{
            setIsLoading(false);
        });
    }
    const clickAnswerButton = () =>{
        setAnsweredFlag(true);
        const tmpSelectedChoiceIds = JSON.stringify(selectedChoiceIds.sort());
        const tmpCorrctChoiceIds = JSON.stringify(correctChoiceIds.sort());
        const corrected = tmpSelectedChoiceIds === tmpCorrctChoiceIds;
        if(corrected){
            setCorrectFlag(true);
        }else{
            setCorrectFlag(false);
        }
    }
    const clickNextButton = () => {
        setIsLoading(true);
        setAnsweredFlag(false);
        setSelectedChoiceIds([]);
        setCorrectFlag(false);
        getRandomQuestion();
        window.scrollTo(0, 0);
    }
    return (
        <div className="container">
            {(question !== "" && !isLoading) &&
            <span>
                <p className="text-left">
                    id:{question.question_id} - {question.category.workbook.workbook_name} - {question.category.category_name}
                </p>
                <div className="row h1 bg-dark text-white">
                    問題{question.question_number}
                </div>
                <Question question={question} questionImages={questionImages}/>
                <ChoicesForm
                    choices={question.choices}
                    setSelectedChoiceIds={setSelectedChoiceIds}
                    selectedChoiceIds={selectedChoiceIds}
                    answeredFlag={answeredFlag}
                />
                <div className="row">※{correctChoiceIds.length}つ選択してください</div>
                <button
                    type="button"
                    className="btn btn-primary btn-block mb-3"
                    onClick={clickAnswerButton}
                    disabled={selectedChoiceIds.length !== correctChoiceIds.length}
                >
                    回答
                </button>
                <div className="result">
                    {answeredFlag &&
                        <span>
                            <div className="row h3 bg-dark text-white">
                                解答解説
                            </div>
                            <Result
                                answerImages={answerImages}
                                answeredFlag={answeredFlag}
                                correctFlag={correctFlag}
                            />
                        </span>
                    }
                    <CSSTransition in={answeredFlag} classNames={correctFlag ? "success" : "wrong"} timeout={0}>
                        <div></div>
                    </CSSTransition>
                </div>
            </span>
            }
            {answeredFlag &&
                    <button className="btn btn-outline-dark btn-block mb-3" onClick={clickNextButton}>次の問題へ</button>
            }
            {isLoading && 
                <span style={overlay}>
                    <div>loading...</div>
                    <div className="spinner-border">
                    </div>
                </span>
            }
        </div>
    );
}

if (document.getElementById('random-question-page')) {
    ReactDOM.render(<RandomQuestionPage />,document.getElementById('random-question-page'));
}
