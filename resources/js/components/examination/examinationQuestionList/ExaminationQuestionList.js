import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ExaminationQuestionContent from './ExaminationQuestionContent';

function ExaminationQuestionList(props) {
    return (
        <div className="container">
            試験問題一覧
            {props.questions.map((question, key) => 
                <div key={key}>
                    <ExaminationQuestionContent
                        question={question}
                        examinationQuestionNumber={key + 1}
                        setExeminationState={props.setExeminationState}
                        setActiveQuestionId={props.setActiveQuestionId}
                    />
                </div>
            )}
        </div>
    );
}

export default ExaminationQuestionList;
