import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from '../question/Question';
import Choices from '../question/Choices';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';
import MylistModal from '../search/MylistModal'
import { CSSTransition } from 'react-transition-group';

function QuestionArea(props) {
    const [ loginUser, setLoginUser] = useState("");
    const [ activeMylistModal, setActiveMylistModal] = useState(false);
    const [ mylistdirs, setMylistdirs] = useState("");
    const [ selectedMylistdirId, setSelectedMylistdirId] = useState(-1);
    const [ popupFlag, setPopupFlag] = useState(false);
    const [ popupMsg, setPopupMsg] = useState("");
    useEffect(() => {
        getLoginUser();
    },[]);
    useEffect(() => {
        if (loginUser && loginUser.authority_id <= "2") {
            getMylistdirs();
            //console.log("登録済みユーザー");
        }else{
            //console.log("ゲスト");
        }
    },[loginUser]);

    let correctCount = 0;
    let wrongCount = 0;
    let data = {
        correctCount:correctCount,
        wrongCount:wrongCount
    }
    const getLoginUser = async () => {
            const result = await axios.get('get-login-user');
            const data = result.data;
            setLoginUser(JSON.parse(JSON.stringify(data.loginUser)));
    };
    const getMylistdirs = async () => {
        const result = await axios.get('../get-mylistdirs-question/');
        const dbData = result.data.dbData;
        const mylistdirs = JSON.parse(JSON.stringify(dbData));
        if (mylistdirs.length>0){
            setMylistdirs(mylistdirs);
        }
    };
    const addMylist = async (questionId) => {
        try {
            const result = await axios.post('../add-mylist/', {
                params:{
                    "mylistdir_id":selectedMylistdirId,
                    "question_id":props.question.question_id
                }
            });
            setPopupMsg("マイリストに問題を追加しました");
            setPopupFlag(!popupFlag);
            getMylistdirs();
        } catch(error){
            console.log(error);
            setPopupMsg("DBエラー：マイリストに問題を追加できませんでした。");
            setPopupFlag(!popupFlag);
        }
    };
    const clickAnswerButton = () =>{
        props.setAnsweredFlag(true);
        const selectedChoiceSymbol = props.question.choices.find((choice) => choice.choice_id == props.selectedChoiceId).choice_symbol;
        props.setSelectedChoiceSymbol(selectedChoiceSymbol);
        if(props.question.answer.choice_id == props.selectedChoiceId){
            props.setCorrectFlag(true);
            data = {
                correctCount:props.score.correctCount + 1,
                wrongCount:props.score.wrongCount
            }
        }else{
            props.setCorrectFlag(false);
            data = {
                correctCount:props.score.correctCount,
                wrongCount:props.score.wrongCount+1
            }
        }
        props.setScore(data);
    }
    const clickMylistButton = () => {
        setSelectedMylistdirId(-1);
        //マイリスト登録モーダルを表示する
        setActiveMylistModal(true);
    }
    return (
        <div className="container">
            <p className="text-right">
                正答率:{Math.round(props.score.correctCount/(props.score.correctCount+props.score.wrongCount)*1000)/10 + "%"}
                 ( 正解数:{props.score.correctCount} / 出題数:{props.score.correctCount+props.score.wrongCount} )
            </p>
            <Question question={props.question}/>
            <Choices choices={props.question.choices}/>
            <ChoicesForm
                choices={props.question.choices} 
                setSelectedChoiceId={props.setSelectedChoiceId}
                selectedChoiceId={props.selectedChoiceId}
                answeredFlag={props.answeredFlag}
            />
            {props.selectedChoiceId > 0 ? 
                <button className="btn btn-outline-dark btn-block mb-3" onClick={clickAnswerButton} disabled={props.answeredFlag}>回答</button> 
            : null}
            <Result
                answer={props.question.answer}
                answeredFlag={props.answeredFlag}
                correctFlag={props.correctFlag}
                correctSymbol={props.correctSymbol}
                selectedChoiceSymbol={props.selectedChoiceSymbol}
            />
            {props.answeredFlag &&
                    <button className="btn btn-outline-dark btn-block mb-3" onClick={props.clickNextButton}>次の問題へ</button>
            }
            {(loginUser && loginUser.authority_id <= "2") &&
                <div className="text-right">
                    <button className="btn btn-success" onClick={()=>clickMylistButton(props.question.question_id)}>
                        この問題をマイリストに登録
                    </button>
                </div>
            }
            {activeMylistModal &&
                <MylistModal
                    setActiveMylistModal={setActiveMylistModal}
                    questionId={props.question.question_id}
                    getMylistdirs={getMylistdirs}
                    mylistdirs={mylistdirs}
                    addMylist={addMylist}
                    selectedMylistdirId={selectedMylistdirId}
                    setSelectedMylistdirId={setSelectedMylistdirId}
                />
            }
            <CSSTransition in={popupFlag} classNames="popup" timeout={2000}>
                <div>{popupMsg}</div>
            </CSSTransition>
        </div>
    );
}

export default QuestionArea;
