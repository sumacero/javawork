import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Question(props) {

    return (
        <div className="border border-1 border-dark rounded-3 bg-white">
            <h1 className="bg-primary text-white">問題</h1>
            {props.question &&
                <p className="text-right">
                    {props.question.subcategory.category.category_name} - {props.question.subcategory.subcategory_name}
                </p>
            }
            <p>{props.question.question_text}</p>
        </div>
    );
}

export default Question;