import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function DoneExaminationModal(props){
    const modalContent = {
        background: "white",
        padding: "10px",
        borderRadius: "3px",
        width: "90%",
        height: "50%",
    };
    const overlay = {
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "100000",
    };
    useEffect(() => {
        document.addEventListener('click', closeModal)
        event.stopPropagation()
        return ()=>{
            document.removeEventListener('click',closeModal)
        }
    },[]);
    const modalRef = useRef();
    const closeModal = useCallback((event)=>{
        if(!modalRef.current.contains(event.target)) clickCancelButton();
    },[]);
    const clickCancelButton = ()=>{
        props.setOpenDoneExaminationModal(false)
        document.removeEventListener('click',closeModal);
    }
    const clickEnterButton = ()=>{
        props.finishExamination();
        props.setOpenDoneExaminationModal(false)
        document.removeEventListener('click',closeModal);
    }
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto d-flex align-items-center justify-content-center" ref={modalRef}>
                    <div className="container">
                        <div className="row h5 py-3">試験を完了します。よろしいですか。</div>
                        {!props.allAnswered && 
                            <div className="row h5 py-3 text-danger">※注意：未回答の問題があります</div>
                        }
                        <div className="row align-items-center py-3">
                            <button className="btn btn-primary btn-block py-3" onClick={clickCancelButton}>試験を続行</button>
                        </div>
                        <div className="row align-items-center py-3">
                            <button className="btn btn-primary btn-block py-3" onClick={clickEnterButton}>回答完了（試験を終了する）</button>
                        </div>
                    </div>
                </span>
            </span>
        </div>
    )
}

export default DoneExaminationModal;