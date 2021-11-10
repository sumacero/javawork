import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Result(props) {
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
        <div>
            <div>解答結果：{props.correctFlag ? "正解" : "不正解"}</div>
            <div>{convertText(props.answer.answer_text)}</div>
        </div>
    );
}

export default Result;