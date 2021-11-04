import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Choices(props) {
    return (
        <div>
            {props.choices.map((choice) =>
                <div key={choice.choice_id} className="card">
                    <span className="card-header">
                        {choice.choice_symbol}
                    </span>
                    <span className="card-body">
                        <span className="card-text">{choice.choice_text}</span>
                    </span>
                </div>
            )}
        </div>
    );
}

export default Choices;