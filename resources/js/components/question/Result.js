import React, { useEffect, useState } from 'react';

function Result(props) {
    useEffect(() => {
        if (props.answeredFlag) {
            const element = document.documentElement;
            const bottom = element.scrollHeight - element.clientHeight;
            window.scroll(0, bottom);
        }
    },[props.answeredFlag]);
    return (
        <div className="row row-cols-2 border border-1 border-dark rounded-3 mb-3">
            {props.answerImages.map((answerImage, index) =>
                <div key={index} className="col border">
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
    );
}

export default Result;