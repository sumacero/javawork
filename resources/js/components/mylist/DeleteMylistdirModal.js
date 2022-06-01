import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function DeleteMylistdirModal(props){
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
    const [formError, setFormError] = useState("");
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
        props.setOpenDeleteMylistdirModal(false)
        document.removeEventListener('click',closeModal);
    }
    const clickEnterButton = ()=>{
        props.deleteMylistdir();
        props.setOpenDeleteMylistdirModal(false)
        document.removeEventListener('click',closeModal);
    }
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto" ref={modalRef}>
                    <p>以下のマイリストを削除します。よろしいですか。</p>
                    <div>マイリスト名：{props.selectedMylistdir.mylistdir_name}</div>
                    <button className="btn btn-primary btn-block" onClick={clickEnterButton}>削除</button>
                    <button className="btn btn-primary btn-block" onClick={clickCancelButton}>キャンセル</button>
                </span>
            </span>
        </div>
    )
}

export default DeleteMylistdirModal;