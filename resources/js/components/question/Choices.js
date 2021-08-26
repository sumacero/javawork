import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Choices(props) {
    return (
        <div>
            {props.choices.map((choice) =>
                <div key={choice.choice_id}>
                    <div>{choice.choice_symbol}</div>
                    <div>{choice.choice_text}</div>
                </div>
            )}
        </div>
    );
}

export default Choices;