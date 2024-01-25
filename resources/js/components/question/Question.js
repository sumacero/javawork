import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Question(props) {
    return (
        <div className="row row-cols-2 border border-1 border-dark rounded-3">
            {props.questionImages.map((questionImage, index) =>
                <div key={index} className="col border">
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
    );
}

export default Question;