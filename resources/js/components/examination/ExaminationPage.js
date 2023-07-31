import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Question from '../question/Question';
import ChoicesForm from '../question/ChoicesForm';
import Result from '../question/Result';
import { CSSTransition } from 'react-transition-group';
import ExaminationSetting from './examinationSetting/ExaminationSetting.js';
import ExaminationQuestionList from './examinationQuestionList/ExaminationQuestionList.js';
import ExaminationQuestion from './examinationQuestion/ExaminationQuestion.js';

function ExaminationPage() {
    // 試験の状態(setting, question, questionList, result)
    const [ examinationState, setExeminationState] = useState("setting");
    const [ questions, setQuestions] = useState([]);
    const [ activeQuestionId, setActiveQuestionId] = useState("");
    return (
        <div className="container">
            {examinationState}
            {examinationState == "setting" &&
                <ExaminationSetting
                    setExeminationState={setExeminationState}
                    setQuestions={setQuestions}
                />
            }
            {examinationState == "questionList" &&
                <ExaminationQuestionList
                    setExeminationState={setExeminationState}
                    setActiveQuestionId={setActiveQuestionId}
                    questions={questions}
                />
            }
            {examinationState == "openQuestion" &&
                <ExaminationQuestion
                    setExeminationState={setExeminationState}
                    //question={questions}
                />
            }
        </div>
    );
}

if (document.getElementById('examination-page')) {
    ReactDOM.render(<ExaminationPage />,document.getElementById('examination-page'));
}
