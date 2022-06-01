import { checkPropTypes } from 'prop-types';
import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import MylistdirRadio from './MylistdirRadio';

function MylistModal(props){
    const modalContent = {
        background: "white",
        padding: "10px",
        borderRadius: "3px",
        width: "30%",
        height: "30%",
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
    const modalRef = useRef()
    const closeModal = useCallback((event)=>{
        if(!modalRef.current.contains(event.target)) clickCancelButton();
    },[]);
    const clickCancelButton = ()=>{
        props.setActiveMylistModal(false);
        document.removeEventListener('click',closeModal);
    }
    const clickEnterButton = ()=>{
        props.addMylist();
        props.setActiveMylistModal(false);
        document.removeEventListener('click',closeModal);
    }
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto" ref={modalRef}>
                    <p>マイリスト登録するリストを選択してください</p>
                    { props.mylistdirs != "" &&
                        <MylistdirRadio
                            getMylistdirs={props.getMylistdirs}
                            mylistdirs={props.mylistdirs}
                            setSelectedMylistdirId={props.setSelectedMylistdirId}
                            questionId={props.questionId}
                        />
                    }
                    <button className="btn btn-primary btn-block" onClick={clickEnterButton} disabled={props.selectedMylistdirId==-1}>登録</button>
                    <button className="btn btn-primary btn-block" onClick={clickCancelButton}>キャンセル</button>
                </span>
            </span>
        </div>
    )
}

export default MylistModal;