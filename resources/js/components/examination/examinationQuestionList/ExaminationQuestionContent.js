import React, { useEffect, useState } from 'react';

function ExaminationQuestionContent(props){
    const previewImage = props.question.images.find((image) => image.image_type == "question");
    const clickOpenQuestionButton = () => {
        props.setActiveQuestionId=(props.question.question_id)
        props.setExeminationState("openQuestion");
    }
    return(
        <div className="border container">
            <div className="row border">
                <div className="col-3 border">
                    <div className="row border">
                        <div>問{props.examinationQuestionNumber}</div>
                    </div>
                    <div className="row border">
                        <div className="col border">
                            <img className="img-fluid"
                                src={previewImage.image_file}
                                alt="previewImage"
                                width="100%"
                            >
                            </img>
                        </div>
                    </div>
                    <div className="row border">
                        <div className="col border">
                            <button
                                type="button"
                                className="btn btn-outline-dark btn-block mb-3"
                                onClick={clickOpenQuestionButton}
                            >
                                問題を開く
                            </button> 
                        </div>
                    </div>
                    <div className="row border">
                        回答済み
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExaminationQuestionContent;