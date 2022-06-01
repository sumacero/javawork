import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function QuestionContent(props){
    const clickQuestionButton = (question_id) => {
        //演習画面へ移動する
        location.href = "question/" + question_id;
    }
    const clickDeleteMylistButton = () => {
        //マイリストフォルダからマイリストを削除する
        props.deleteMylist(props.mylistId);
    }
    return(
        <div className="border container">
            <div className="row border">
                <div className="col border">
                    <div>ID:{props.question.question_id}</div>
                    <div>ステータス：{props.question.status.status_name}</div>
                    <div>カテゴリ：{props.question.subcategory && props.question.subcategory.category.category_name}</div>
                    <div>サブカテゴリ：{props.question.subcategory && props.question.subcategory.subcategory_name}</div>
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
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col">
                                <div className="text-right">
                                    <button className={"btn btn-primary btn-sm"} onClick={()=>clickDeleteMylistButton()}>
                                    マイリストから削除
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-8 border">
                    <div className="row border">
                        <div className="col border">
                            問題文
                            <div
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontFamily: "sans-serif"
                                }}
                            >
                                {props.question.question_text}
                            </div>
                        </div>
                    </div>
                    <div className="row border">
                        <div className="col border">
                            選択肢
                            {props.question.choices.map((choice) => 
                                <div
                                    key={choice.choice_id}
                                    style={{
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                        fontFamily: "sans-serif"
                                    }}
                                >
                                    {choice.choice_symbol}：{choice.choice_text}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="row border">
                        <div className="col border">
                            解答
                            <div
                                style={{
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                    fontFamily: "sans-serif"
                                }}
                            >
                                {props.question.answer && props.question.answer.answer_text}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default QuestionContent;