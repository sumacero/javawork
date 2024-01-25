import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function TimeUpExaminationModal(props){
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
    }

    const clickEnterButton = ()=>{
        props.finishExamination();
        props.setOpenTimeUpExaminationModal(false)
        document.removeEventListener('click',closeModal);
    }
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto d-flex align-items-center justify-content-center" ref={modalRef}>
                    <div className="container">
                        <div className="row j5 text-danger py-3">回答時間が切れました。試験を完了します。</div>
                        <div className="row align-items-center py-3">
                            <button className="btn btn-primary btn-block py-3" onClick={clickEnterButton}>確認</button>
                        </div>
                    </div>
                </span>
            </span>
        </div>
    )
}

export default TimeUpExaminationModal;