import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function ChangeMylistdirNameModal(props){
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
    const [mylistdirNameText, setMylistdirNameText] = useState("");
    const [formError, setFormError] = useState("");
    useEffect(() => {
        document.addEventListener('click', closeModal);
        event.stopPropagation();
        return ()=>{
            document.removeEventListener('click',closeModal);
        }
    },[]);
    const modalRef = useRef();
    const closeModal = useCallback((event)=>{
        if(!modalRef.current.contains(event.target)) clickCancelButton();
    },[]);
    const clickCancelButton = ()=>{
        props.setOpenChangeMylistdirNameModal(false);
        document.removeEventListener('click',closeModal);
    }
    const clickEnterButton = ()=>{
        props.changeMylistdirName(mylistdirNameText);
        props.setOpenChangeMylistdirNameModal(false)
        document.removeEventListener('click',closeModal);
    }
    const changeMylistdirNameText =(event)=>{
        const text = event.target.value;
        const mylistdirNames = props.mylistdirs.map((mylistdir) => mylistdir.mylistdir_name);
        if (text.length>50){
            setFormError("50文字以内で入力してください。");
        }else if (mylistdirNames.includes(text)){
            setFormError("既にこのマイリスト名は使われています。");
        }else{
            setFormError("");
            setMylistdirNameText(event.target.value);
        }
    }
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto" ref={modalRef}>
                    <p>マイリスト名を変更します。新規名称を入力してください。</p>
                    <div>現在のマイリスト名：{props.selectedMylistdir.mylistdir_name}</div>
                    <input type="text" defaultValue={props.selectedMylistdir.mylistdir_name} onChange={changeMylistdirNameText} style={{width:"100%"}}></input>
                    {formError && <span className="text-danger">{formError}</span>}
                    <button className="btn btn-primary btn-block" onClick={clickEnterButton} disabled={formError || !mylistdirNameText}>決定</button>
                    <button className="btn btn-primary btn-block" onClick={clickCancelButton}>キャンセル</button>
                </span>
            </span>
        </div>
    )
}

export default ChangeMylistdirNameModal;