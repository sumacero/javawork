import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';

function Animation(){
    const [judge, setJudge] = useState(false);
    const clickButton = () => setJudge(!judge);
    return (
        <div>
            <button onClick={clickButton}>click</button>
            <CSSTransition in={judge} classNames="fade" timeout={0}>
                <p></p>
            </CSSTransition>
        </div>
    );
}

if (document.getElementById('animation')) {
    ReactDOM.render(<Animation />, document.getElementById('animation'));
}