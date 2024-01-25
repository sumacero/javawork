import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { CSSTransition } from 'react-transition-group';
import ExaminationResultTable from './ExaminationResultTable.js';
import SelectedCategoryTable from './SelectedCategoryTable.js';
import TitleContent from './TitleContent.js';
import MemoContent from './MemoContent.js';
import DeleteExaminationModal from './DeleteExaminationModal';

function ExaminationResultPage() {
    const [ examinationId, setExaminationId] = useState(location.pathname.split('/').slice(-1)[0]);
    const [ examination, setExamination] = useState("");
    const [ workbooks, setWorkbooks ] = useState([]);
    const [ categories, setCategories] = useState([]);
    const defaultValues = {
        "examination_id": "",
        "title": "",
        "memo": "",
    };
    const [formValues, setFormValues] = useState(defaultValues);
    const defaultErrors = {
        "examination_id": "",
        "title": "",
        "memo": "",
    };
    const [ laravelVaridateErrors, setLaravelVaridateErrors] = useState(defaultErrors);
    const [ popupFlag, setPopupFlag] = useState(false);
    const [ popupMsg, setPopupMsg] = useState("");
    const [ openDeleteExaminationModal, setOpenDeleteExaminationModal] = useState(false);

    useEffect(() => {
        const getExamination = async () => {
            let res1;
            let res2;
            const asyncFunc = async (data) => {
                console.log("postData↓");
                console.log(data);
                res1 = await axios.post('get-examination-result-data', {
                    examination_id:data
                });
                res2 = await axios.get('../get-categories');
            };
            asyncFunc(examinationId)
            .then(() => {
                console.log(res1.data);
                console.log(res2.data);
                setExamination(res1.data.examination);
                setWorkbooks(res2.data.dbData.workbooks);
                setCategories(res2.data.dbData.categories);
                setFormValues(state => ({
                    ...state,
                    "examination_id":res1.data.examination.examination_id,
                    "title":res1.data.examination.title,
                    "memo":res1.data.examination.memo,
                }));
            })
            .catch((error)=>{
                console.log("試験データ読み取りエラーが発生");
                console.log(error)
            })
        };
        getExamination();
    },[]);

    const clickDeleteButton = ()=>{
        setOpenDeleteExaminationModal(true);
    }

    const deleteExamination = () => {
        let res1;
        const asyncFunc = async (data) => {
            console.log("postData↓");
            console.log(data);
            res1 = await axios.post('delete-examination', {
                examination_id:data
            });
        };
        asyncFunc(examinationId)
        .then(() => {
            console.log("試験データの削除が完了");
            window.location.href = '../examination-top';
        })
        .catch((error)=>{
            console.log("試験データの削除に失敗(サーバーエラーが発生)");
            console.log(error)
        })
    };

    return (
        <div className="container">
            <div className="card text-center">
                <div className="card-header">
                    試験結果
                </div>
                <div className="card-body">
                    <div className="card-title h5">
                        {examination.is_passing ? "合格":"不合格"}
                    </div>
                    <div className="card-text">
                        <div>   
                            正解率：{examination.correct_answer_rate}%&emsp;正解数：{examination.score}問
                        </div>
                        <div>
                            受験者：{examination.user?.name}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-header">
                    試験概要
                </div>
                <div className="card-body">
                    <TitleContent
                        examination = {examination}
                        setExamination = {setExamination}
                        setLaravelVaridateErrors = {setLaravelVaridateErrors}
                        laravelVaridateErrors = {laravelVaridateErrors}
                        defaultErrors = {defaultErrors}
                        setFormValues = {setFormValues}
                        formValues = {formValues}
                        popupFlag = {popupFlag}
                        setPopupFlag = {setPopupFlag}
                        setPopupMsg = {setPopupMsg}
                    />
                    <div className="card-text">
                        <div className="row">     
                            <div className="col">
                                試験時間：{examination.set_time}分
                            </div>
                            <div className="col">
                                出題数：{examination.set_question_count}問
                            </div>                               
                        </div>
                        <div className="row pb-1">
                            <div className="col">
                                開始日時：{examination.started_at}
                            </div>
                            <div className="col">
                                終了日時：{examination.finished_at}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="card">
                                    <div className="card-header">
                                        出題カテゴリ
                                    </div>
                                    <div className="card-body">
                                        <div className="card-text">
                                            <SelectedCategoryTable
                                                examinationCategories={examination.examination_categories}
                                                workbooks={workbooks}
                                                categories={categories}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row py-3">
                        <div className="col">
                            <MemoContent
                                examination = {examination}
                                setExamination = {setExamination}
                                setLaravelVaridateErrors = {setLaravelVaridateErrors}
                                laravelVaridateErrors = {laravelVaridateErrors}
                                defaultErrors = {defaultErrors}
                                setFormValues = {setFormValues}
                                formValues = {formValues}
                                popupFlag = {popupFlag}
                                setPopupFlag = {setPopupFlag}
                                setPopupMsg = {setPopupMsg}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col text-right">
                            試験ID：{examination.examination_id}
                        </div>
                    </div>
                </div>
            </div>
            <div className="card text-center">
                <div className="card-header">
                    問題一覧
                </div>
                <div className="card-body">
                    <div className="card-text">
                        <ExaminationResultTable
                            examinationQuestions={examination.examination_questions}
                        />
                    </div>
                </div>
            </div>
            <div className="row py-3">
                <div className="col">
                    <button
                        type="button"
                        className="btn btn-secondary btn-block"
                        onClick={clickDeleteButton}
                    >
                        試験データを削除
                    </button>
                </div>
            </div>
            {openDeleteExaminationModal &&
                <DeleteExaminationModal
                    setOpenDeleteExaminationModal={setOpenDeleteExaminationModal}
                    deleteExamination={deleteExamination}
                />
            }
            <CSSTransition in={popupFlag} classNames="popup" timeout={2000}>
                <div>{popupMsg}</div>
            </CSSTransition>
        </div>
    );
}

if (document.getElementById('examination-result-page')) {
    ReactDOM.render(<ExaminationResultPage />,document.getElementById('examination-result-page'));
}

