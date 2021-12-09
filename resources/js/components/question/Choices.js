import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Choices(props) {
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
        <div className="pb-3">
            {props.choices.map((choice) =>
                <div key={choice.choice_id} className="card">
                    <span className="card-body">
                        <p className="card-title ">
                            {choice.choice_symbol}
                        </p>
                        <span className="card-text small">{convertText(choice.choice_text)}</span>
                    </span>
                </div>
            )}
        </div>
    );
}

export default Choices;