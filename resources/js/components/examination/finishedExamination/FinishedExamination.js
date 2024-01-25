import React, { useEffect, useState } from 'react';

function FinishExamination(props){
    const clickShowResultButton = () => {
        props.moveResultPage();
    }
    return(
        <div className="border container">
            <p>試験が終了しました。お疲れ様でした。</p>
            <div className="row">
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-primary btn-block mb-3"
                        onClick={clickShowResultButton}
                    >
                        試験結果を見る
                    </button> 
                </div>
            </div>
        </div>
    )
}

export default FinishExamination;