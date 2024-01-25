import React, { useEffect, useState} from 'react';
import ExaminationQuestionTable from './ExaminationQuestionTable';

function ExaminationQuestionList(props) {
    const clickDoneButton = () => {
        const allAnswered = !props.examinationQuestions
            .map((examinationQuestion) => examinationQuestion.is_answered).includes(0);
        props.setAllAnswered(allAnswered);
        props.setOpenDoneExaminationModal(true);
    }
    return (
        <div className="container">
            <p className="text-right">残り時間：{props.timeLeftString}</p>
            <ExaminationQuestionTable
                examinationQuestions={props.examinationQuestions}
                openQuestion={props.openQuestion}
            />
            <button
                type="button"
                className="btn btn-primary btn-block mb-3"
                onClick={clickDoneButton}
            >
                回答完了（試験を終了する）
            </button>
        </div>
    );
}

export default ExaminationQuestionList;
