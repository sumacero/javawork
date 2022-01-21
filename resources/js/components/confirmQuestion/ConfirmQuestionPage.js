import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Question from '../question/Question';
import Choices from '../question/Choices';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';

function ConfirmQuestionPage() {
    const question_id = parseInt($('#tmp').data('question_id'));
    const [ question, setQuestion] = useState("");
    const [ choices, setChoices ] = useState([]);
    const [ answer, setAnswer] = useState("");
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceId, setSelectedChoiceId] = useState(0);
    const [ correctFlag, setCorrectFlag] = useState(false);
    const [ correctSymbol, setCorrectSymbol] =useState("");
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('get-qa/' + question_id);
            const data = result.data.dbData;
            setQuestion(JSON.parse(JSON.stringify(data.question)));
            setChoices(JSON.parse(JSON.stringify(data.choices)));
            setAnswer(JSON.parse(JSON.stringify(data.answer)));
            const correctChoice = data.choices.find((choice)=>choice.choice_id === data.answer.choice_id);
            setCorrectSymbol(correctChoice.choice_symbol);
        };
        fetchData();
    },[]);
    const clickAnswerButton = () =>{
        setAnsweredFlag(true);
        setCorrectFlag(answer.choice_id == selectedChoiceId)
    }
    const clickCommitButton = () => {
        console.log("編集内容を確定します");
        let postData = {
          "question_id": question_id,
        };
        const func = async () => {
            try {
                let res = await axios.post("commit-question", postData);
                alert("問題の登録が完了しました");
                location.href = ".";
            } catch (error) {
                console.log(error.response.data);
                alert("サーバーエラーが発生しました。");
            }
        };
        func();
    }
    const clickEditButton = () => {
        //編集画面に戻る
        location.href = "edit-question?question_id=" + question_id;
    }
    return (
        <div className="container">
            <div>
                <Question question={question}/>
                <Choices choices={choices}/>
                <ChoicesForm choices={choices} setSelectedChoiceId={setSelectedChoiceId}/>
                {selectedChoiceId > 0 ? 
                    <button type="button" className="btn btn-dark btn-block mb-3" onClick={clickAnswerButton} disabled={answeredFlag}>回答</button> 
                : null}
                <Result answer={answer} answeredFlag={answeredFlag} correctFlag={correctFlag} correctSymbol={correctSymbol}/> 
            </div>
            <div>
                <p>以上の内容で登録します。よろしいですか？</p>
                <button type="button" className="btn btn-primary" onClick={clickCommitButton}>確定</button>
                <button type="button" className="btn btn-primary" onClick={clickEditButton}>修正(編集画面へ戻る)</button>
            </div>
        </div>
    );
}

if (document.getElementById('confirm-question-page')) {
    ReactDOM.render(<ConfirmQuestionPage />,document.getElementById('confirm-question-page'));
}
