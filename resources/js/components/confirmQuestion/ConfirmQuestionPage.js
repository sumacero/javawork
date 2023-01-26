import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Question from '../question/Question';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';

function ConfirmQuestionPage() {
    const questionId = parseInt($('#tmp').data('question_id'));
    const [ question, setQuestion] = useState("");
    const [ questionImages, setQuestionImages] = useState([]);
    const [ answerImages, setAnswerImages] = useState([]);
    const [ answeredFlag, setAnsweredFlag ] = useState(false);
    const [ selectedChoiceIds, setSelectedChoiceIds] = useState([]);
    const [ correctChoiceIds, setCorrectChoiceIds] =useState([]);
    const [ correctFlag, setCorrectFlag] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('../get-question/' + questionId);
            const data = result.data;
            console.log(data);
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
        fetchData();
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
    const clickCommitButton = () => {
        console.log("編集内容を確定します");
        let postData = {
          "question_id": questionId,
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
        location.href = "edit-question?question_id=" + questionId;
    }
    return (
        <div className="container">
            動作確認画面
            {question !== "" &&
            <span>
                <p className="text-left">
                    {question.category.workbook.workbook_name} - {question.category.category_name}
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
                <div>
                    <p>以上の内容で登録します。よろしいですか？</p>
                    <button type="button" className="btn btn-primary btn-block mb-3" onClick={clickCommitButton}>確定</button>
                    <button type="button" className="btn btn-primary btn-block mb-3" onClick={clickEditButton}>修正(編集画面へ戻る)</button>
                </div>
            </span>
            }
        </div>
    );
}

if (document.getElementById('confirm-question-page')) {
    ReactDOM.render(<ConfirmQuestionPage />,document.getElementById('confirm-question-page'));
}
