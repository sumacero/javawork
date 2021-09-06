import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function Result(props) {
    return (
        <div>
            <div>解答結果：{props.correctFlag ? "正解" : "不正解"}</div>
            <div>{props.answer.answer_text}</div>
        </div>
    );
}

export default Result;