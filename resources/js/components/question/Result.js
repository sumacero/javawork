import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

function Result(props) {
    useEffect(() => {
        const element = document.documentElement;
        const bottom = element.scrollHeight - element.clientHeight;
        window.scroll(0, bottom);
    },[props.answeredFlag]);
    //半角コードを半角に置換、改行コードを<br/>に置換
    const convertText = (arg)=> {
        let text = "";
        let tmp = "";
        if(arg !== undefined){
            arg.split(" ").map((item) => {
                tmp = tmp + item + "&nbsp;";
            });
            tmp.split("\n").map((item) => {
                text = text + item + "<br/>";
            });
        }
        return <span dangerouslySetInnerHTML={{__html: text}}></span>;
    };
    return (
        <div className="result">
            {props.answeredFlag ?
                <div className="border border-1 border-dark rounded-3 bg-white mb-3">
                    <h3 className="bg-dark text-white">
                        正解:{props.correctSymbol}
                        <span className="h5">
                            ...あなたの回答:{props.selectedChoiceSymbol}({props.correctFlag ? "正解" : "不正解"})
                        </span>
                    </h3>
                    <div>{convertText(props.answer.answer_text)}</div>
                </div>
            :null}
            <CSSTransition in={props.answeredFlag} classNames={props.correctFlag ? "success" : "wrong"} timeout={0}>
                <div></div>
            </CSSTransition>
        </div>
    );
}

export default Result;