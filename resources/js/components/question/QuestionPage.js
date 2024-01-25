import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from './Question';
import ChoicesForm from './ChoicesForm';
import Result from './Result';
import { CSSTransition } from 'react-transition-group';

function QuestionPage() {
    const [ question_id, setQuestion_id] = useState(location.pathname.split('/').slice(-1)[0]);
    const [ question, setQuestion] = useState("");
    const [ questionImages, setQuestionImages] = useState([]);
    const [ answerImages, setAnswerImages] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceIds, setSelectedChoiceIds] = useState([]);
    const [ correctChoiceIds, setCorrectChoiceIds] = useState([]);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const [ prevQuestionId, setPrevQuestionId] = useState(-1);
    const [ nextQuestionId, setNextQuestionId] = useState(-1);

    useEffect(() => {
        const getQuestion = async () => {
            const result = await axios.get('../get-question/' + question_id);
            const data = result.data;
            setQuestion(JSON.parse(JSON.stringify(data.dbData)));
            setQuestionImages(JSON.parse(JSON.stringify(data.questionImages)));
            setAnswerImages(JSON.parse(JSON.stringify(data.answerImages)))
            if(Array.isArray(data.dbData.choices)){
                setCorrectChoiceIds(data.dbData.choices
                    .filter((choice)=>choice.is_correct === 1)
                    .map((choice)=>choice.choice_id)
                );
            }
        };
        const getPrevNextQuestionId = async () => {
            const result = await axios.get('../get-prev-next-question-id/' + question_id);
            const data = result.data;
            setPrevQuestionId(data.prevQuestionId);
            setNextQuestionId(data.nextQuestionId);
        }
        getQuestion();
        getPrevNextQuestionId();
    },[]);
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
    const clickPrevButton = () =>{
        if(prevQuestionId == -1) return;
        location = "./" + prevQuestionId
    }
    const clickNextButton = () =>{
        if(nextQuestionId == -1) return;
        location = "./" + nextQuestionId
    }
    return (
        <div className="container">
            {question !== "" &&
            <span>
                <p className="text-left">
                    id:{question_id} - {question.category.workbook.workbook_name} - {question.category.category_name}
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
                <div className="col">※{correctChoiceIds.length}つ選択してください</div>
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
                <div className="row">
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={clickPrevButton}
                            disabled={prevQuestionId == -1}
                        >
                            前の問題へ
                        </button>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={clickNextButton}
                            disabled={nextQuestionId == -1}
                        >
                            次の問題へ
                        </button> 
                    </div>
                </div>
            </span>
            }
        </div>
    );
}

if (document.getElementById('question-page')) {
    ReactDOM.render(<QuestionPage />,document.getElementById('question-page'));
}

