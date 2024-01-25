import React, { useEffect, useState } from 'react';

function ExaminationQuestionContent(props){
    const previewImage = props.examinationQuestion.question.images.find((image) => image.image_type == "question");
    //console.log(props.question.question);
    return(
        <div className="border container">
            <div className="row border">
                <div className="col-3 border">
                    <div className="row border">
                        <div>問</div>
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
                                onClick={()=>props.openQuestion(props.examinationQuestion.examination_question_id)}
                            >
                                問題を開く
                            </button> 
                        </div>
                    </div>
                    <div className="row border">
                        {props.examinationQuestion.is_answered === 1 ?
                            <div>回答済み</div>
                            :
                            <div className="text-danger">未回答</div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ExaminationQuestionContent;