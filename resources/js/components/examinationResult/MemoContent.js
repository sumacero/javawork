import React, { useEffect, useState} from 'react';
import MemoEditor from '../examination/examinationSetting/MemoEditor';

function MemoContent(props) {
    const [ isEditActive, setIsEditActive] = useState(false);
    const [ onMouse, setOnMouse] = useState(false);
    const onMouseEvent = ()=>{
        setOnMouse(true);
    }
    const outMouseEvent = ()=>{
        setOnMouse(false);
    }
    const clickEditButton = ()=>{
        setIsEditActive(true);
    }
    const clickSaveButton = ()=>{
        const saveExamination = async () => {
            let res1;
            const asyncFunc = async (data) => {
                console.log("postData↓");
                console.log(data);
                res1 = await axios.post('update-examination', {
                    examination_id:data.examination_id,
                    title:data.title,
                    memo:data.memo
                });
            };
            asyncFunc(props.formValues)
            .then(() => {
                console.log(res1.data);
                props.setLaravelVaridateErrors(props.defaultErrors);
                props.setExamination(state =>({
                    ...state,
                    "memo":res1.data.examination.memo
                }));
                props.setFormValues(state => ({
                    ...state,
                    "memo":res1.data.examination.memo
                }));
                setIsEditActive(false);
                props.setPopupMsg("変更が保存されました");
                props.setPopupFlag(!props.popupFlag);
            })
            .catch((error)=>{
                if(error.response.status == 422){
                    console.log("試験開始バリデーションでエラーが発生！！");
                    const errorObj = error.response.data.errors;
                    console.log(errorObj);
                    props.setLaravelVaridateErrors(errorObj);
                    props.setPopupMsg("サーバーバリデーションエラー");
                    props.setPopupFlag(!props.popupFlag);
                }else{
                    alert("サーバーエラーが発生");
                }
            })
        };
        saveExamination();
    }
    const clickCancelButton = ()=>{
        props.setFormValues(state => ({
            ...state,
            "memo":props.examination.memo
        }));
        props.setLaravelVaridateErrors(props.defaultErrors);
        setIsEditActive(false);
    }

    return(
        <div className="card-title"
            onMouseEnter={onMouseEvent}
            onMouseLeave={outMouseEvent}
        >
            <div className="row">
                {isEditActive ?
                    <div className="col">
                        <MemoEditor
                            errors = {props.laravelVaridateErrors}
                            setFormValues = {props.setFormValues}
                            formValues = {props.formValues}
                        />
                    </div>
                    :
                    <div className="col">
                        <div className="row">
                            <div className="col">
                                ■メモ
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                {props.examination.memo}
                            </div>
                        </div>
                    </div>
                }
                {(onMouse && !isEditActive) &&
                    <div className="col-2">
                        <button onClick={clickEditButton}>
                            編集
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-fill" viewBox="0 0 16 16">
                            <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
                            </svg>
                        </button>
                    </div>
                }
                {
                isEditActive &&
                    <div className="col-2">
                        <button onClick={clickSaveButton}>
                            保存
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-save" viewBox="0 0 16 16">
                            <path d="M2 1a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H9.5a1 1 0 0 0-1 1v7.293l2.646-2.647a.5.5 0 0 1 .708.708l-3.5 3.5a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L7.5 9.293V2a2 2 0 0 1 2-2H14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h2.5a.5.5 0 0 1 0 1H2z"/>
                            </svg>
                        </button>
                        <button onClick={clickCancelButton}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                            </svg>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default MemoContent;