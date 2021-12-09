import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function ChoiceRadio(props) {
    const doChangeAnswer = (event) => {
        props.setSelectedChoiceId(event.target.value)
    }
    return (
        <label className="btn btn-outline-dark">
            <input type="radio"
                name="radio"
                id={props.choice.choice_id}
                value={props.choice.choice_id}
                autoComplete="off"
                onClick={doChangeAnswer}
                disabled={props.answeredFlag}
            />
                {props.choice.choice_symbol}
        </label>
    );
}

export default ChoiceRadio;