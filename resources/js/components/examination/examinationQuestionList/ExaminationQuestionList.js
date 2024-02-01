import React, { useEffect, useState} from 'react';
import ExaminationQuestionTable from './ExaminationQuestionTable';

function ExaminationQuestionList(props) {
    const clickDoneButton = () => {
        const allAnswered = !props.questionStatusList
            .map((e) => e.is_answered).includes(false);
        props.setAllAnswered(allAnswered);
        props.setOpenDoneExaminationModal(true);
    }
    return (
        <div className="container">
            <p className="text-right">残り時間：{props.timeLeftString}</p>
            <ExaminationQuestionTable
                questionStatusList={props.questionStatusList}
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
