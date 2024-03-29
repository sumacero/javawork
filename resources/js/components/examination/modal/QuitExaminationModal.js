import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function QuitExaminationModal(props){
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
        props.setOpenQuitExaminationModal(false)
        document.removeEventListener('click',closeModal);
    }
    const clickEnterButton = ()=>{
        //props.finishExamination();
        props.setOpenQuitExaminationModal(false)
        document.removeEventListener('click',closeModal);
    }
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto" ref={modalRef}>
                    <p className="text-danger">画面を閉じるか移動をすると試験が中止されます。よろしいですか。</p>
                    <button className="btn btn-primary btn-block" onClick={clickEnterButton}>はい、試験を中止します。</button>
                    <button className="btn btn-primary btn-block" onClick={clickCancelButton}>いいえ、試験を続行します。</button>
                </span>
            </span>
        </div>
    )
}

export default QuitExaminationModal;