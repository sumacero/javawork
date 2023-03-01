import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

function Result(props) {
    useEffect(() => {
        if (props.answeredFlag) {
            const element = document.documentElement;
            const bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        }
    },[props.answeredFlag]);
    return (
        <div className="result">
            {props.answeredFlag ?
                <div className="border border-1 border-dark rounded-3 bg-white mb-3">
                    <h3 className="bg-dark text-white">
                        解答解説
                    </h3>
                    <div className="container">
                        <div className="row row-cols-2">
                            {props.answerImages.map((answerImage, index) =>
                                <div key={index} className="col border mb-3">
                                    <div className="text-right">
                                        {index+1}/{props.answerImages.length}
                                    </div>
                                    <img
                                        className="img-fluid"
                                        src={answerImage.image}
                                        alt={answerImage.fileName}
                                    >
                                    </img>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            :null}
            <CSSTransition in={props.answeredFlag} classNames={props.correctFlag ? "success" : "wrong"} timeout={0}>
                <div></div>
            </CSSTransition>
        </div>
    );
}

export default Result;