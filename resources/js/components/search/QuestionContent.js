import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MylistModal from './MylistModal'

function QuestionContent(props){
    const [ activeMylistModal, setActiveMylistModal] = useState(false);
    const clickQuestionButton = (question_id) => {
        //問題画面へ移動する
        location.href = "question/" + question_id;
    }
    const clickEditButton = (question_id) => {
        //編集画面へ移動する
        location.href = "edit-question?question_id=" + question_id;
    }
    const clickMylistButton = (question_id) => {
        props.setActiveQuestionId(question_id);
        props.setSelectedMylistdirId(-1);
        //マイリスト登録モーダルを表示する
        setActiveMylistModal(true);
    }
    return(
        <div className="border container">
            <div className="row border">
                <div className="col border">
                    <div>ID:{props.question.question_id}</div>
                    <div>ステータス：{props.question.status.status_name}</div>
                    <div>書籍：{props.question.category.workbook && props.question.category.workbook.workbook_name}</div>
                    <div>カテゴリ：{props.question.category && props.question.category.category_name}</div>
                    <div>問題番号：{props.question.question_number}</div>
                    {props.loginUser.authority_id == "1" &&
                        <span>
                            <div>作成者：{props.question.createuser.name}</div>
                            <div>作成日時：{props.question.created_at}</div>
                            <div>更新者：{props.question.updateuser.name}</div>
                            <div>更新日時：{props.question.updated_at}</div>
                        </span>
                    }
                    <div className="border container">
                        <div className="row border">
                            <div className="col">
                                <div className="mb-1">
                                    <button className={"btn btn-primary btn-block"} onClick={()=>clickQuestionButton(props.question.question_id)} disabled={props.question.status_id!=1}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-play-fill" viewBox="0 0 16 16">
                                        <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
                                        </svg>
                                    </button>
                                </div>
                                <div className="mb-1">
                                {props.loginUser.authority_id == "1" &&
                                    <button className="btn btn-primary btn-block" onClick={()=>clickEditButton(props.question.question_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                                        </svg>
                                    </button>
                                }
                                </div>
                            </div>
                            <div className="col text-center d-flex align-items-center border">
                                <button className="btn btn-outline-primary btn-block" onClick={()=>clickMylistButton(props.question.question_id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5V2zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1H4z"/>
                                        <path d="M8 4a.5.5 0 0 1 .5.5V6H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V7H6a.5.5 0 0 1 0-1h1.5V4.5A.5.5 0 0 1 8 4z"/>
                                        </svg>
                                </button>
                            </div>
                            {activeMylistModal &&
                                <MylistModal
                                    setActiveMylistModal={setActiveMylistModal}
                                    questionId={props.question.question_id}
                                    getMylistdirs={props.getMylistdirs}
                                    mylistdirs={props.mylistdirs}
                                    addMylist={props.addMylist}
                                    selectedMylistdirId={props.selectedMylistdirId}
                                    setSelectedMylistdirId={props.setSelectedMylistdirId}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="col-7 border">
                    <div className="row border">
                        <div className="col border">
                            {
                                props.question.images.filter((image) => image.image_type == "question").map((questionImage) =>
                                <span key={questionImage.image_id}>
                                    <img className="img-fluid" src={"data:image/png;base64," + questionImage.image_file} alt="questionImage"></img>
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionContent;