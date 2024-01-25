import React, { useEffect, useState } from 'react';

function Question(props){
    return (
        <div className="row row-cols-2 border border-1 border-dark rounded-3">
            {props.question.images.map((image, index) =>
                <div key={index} className="col border">
                    <div className="text-right">
                        {index+1}/{props.question.images.length}
                    </div>
                    <img
                        className="img-fluid"
                        src={image.image_file}
                        alt={image.image_path}>
                    </img>
                </div>
            )}
        </div>
    );
}

export default Question;