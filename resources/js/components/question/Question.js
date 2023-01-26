import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Question(props) {
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
        <div className="border border-1 border-dark rounded-3 bg-white mb-3">
            <h1 className="bg-dark text-white">問題{props.question.question_number}</h1>
            <p>{convertText(props.question.question_text)}</p>
            {props.questionImages.map((questionImage) =>
                <span key={questionImage.fileName}>
                    <img className="img-fluid" src={questionImage.image} alt={questionImage.fileName}></img>
                </span>
            )}
        </div>
    );
}

export default Question;