import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Question(props) {
    return (
        <div className="border border-1 border-dark rounded-3 bg-white mb-3">
            <h1 className="bg-dark text-white">問題{props.question.question_number}</h1>
            <div className="container">
                <div className="row row-cols-2">
                {props.questionImages.map((questionImage, index) =>
                    <div key={index} className="col border mb-3">
                        <div className="text-right">
                            {index+1}/{props.questionImages.length}
                        </div>
                        <img
                            className="img-fluid"
                            src={questionImage.image}
                            alt={questionImage.fileName}>
                        </img>
                    </div>
                )}
                </div>
            </div>
        </div>
    );
}

export default Question;