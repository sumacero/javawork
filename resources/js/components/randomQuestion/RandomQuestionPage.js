import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from '../question/Question';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';
import { CSSTransition } from 'react-transition-group';

function RandomQuestionPage() {
    const [ question, setQuestion] = useState("");
    const [ answerLog, setAnswerLog] = useState("");
    const [ questionImages, setQuestionImages] = useState([]);
    const [ answerImages, setAnswerImages] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceIds, setSelectedChoiceIds] = useState([]);
    const [ correctChoiceIds, setCorrectChoiceIds] =useState([]);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const [ categoryIds, setCategoryIds] = useState($('#tmp').data('category_ids').split(','));
    let questionId = -1;
    useEffect(() => {
        getQuestion();
    },[]);
    const getQuestion = async() => {
        const result = await axios.post('random-get-question', categoryIds);
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
            questionId = data.dbData.question_id;
            getAnswerLog();
        }
        else{
            console.log("error");
        }
    };
    const getAnswerLog = async() => {
        const result = await axios.post('get-answer-log', {
            "question_id":questionId,
        });
        const data = result.data;
        if(!data.error){
            setAnswerLog(data.answerLog);
        }
        else{
            console.log("error");
        }
    }
    const updateAnswerLog = async(corrected) => {
        const result = await axios.post('update-answer-log', {
            params:{
                "answer_log_id":answerLog.answer_log_id,
                "is_corrected":corrected
            }
        });
        const data = result.data;
        if(!data.error){
            setAnswerLog(data.answerLog);
        }
        else{
            console.log("error");
        }
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
        updateAnswerLog(corrected);
    }
    const clickNextButton = () => {
        setQuestion("");
        setAnsweredFlag(false);
        setSelectedChoiceIds([]);
        setCorrectFlag(false);
        getQuestion();
        window.scrollTo(0, 0);
    }
    return (
        <div className="container">
            {question !== "" &&
            <span>
                <p className="text-left">
                    id:{question.question_id} - {question.category.workbook.workbook_name} - {question.category.category_name}
                </p>
                <p className="text-right">
                {answerLog.answer_count==0 ?
                    <span>正解率：データなし</span>
                    :
                    <span>
                    全ユーザー正解率：{
                        Math.round(answerLog.correct_count / answerLog.answer_count * 100 * 10) / 10
                    }
                    %</span>
                }
                </p>

                <Question question={question} questionImages={questionImages}/>
                <ChoicesForm
                    choices={question.choices}
                    setSelectedChoiceIds={setSelectedChoiceIds}
                    selectedChoiceIds={selectedChoiceIds}
                    answeredFlag={answeredFlag}
                />
                <p>※{correctChoiceIds.length}つ選択してください</p>
                {selectedChoiceIds.length === correctChoiceIds.length ? 
                    <button type="button" className="btn btn-outline-dark btn-block mb-3" onClick={clickAnswerButton} disabled={answeredFlag}>回答</button> 
                : null}
                <Result
                    answerImages={answerImages}
                    answeredFlag={answeredFlag}
                    correctFlag={correctFlag}
                />
                {answeredFlag &&
                        <button className="btn btn-outline-dark btn-block mb-3" onClick={clickNextButton}>次の問題へ</button>
                }
            </span>
            }
        </div>
    );
}

if (document.getElementById('random-question-page')) {
    ReactDOM.render(<RandomQuestionPage />,document.getElementById('random-question-page'));
}
