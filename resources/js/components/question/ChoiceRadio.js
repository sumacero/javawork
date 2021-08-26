import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function ChoiceRadio(props) {
    return (
        <label className="btn btn-outline-primary">
            <input type="radio" autoComplete="off" id={props.choice.choice_id} name="radio"/>
            {props.choice.choice_symbol}
        </label>
    );
}

export default ChoiceRadio;