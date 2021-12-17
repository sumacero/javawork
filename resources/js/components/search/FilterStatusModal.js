import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterStatus from './FilterStatus';


function FilterStatusModal(props){
    const modalContent = {
        background: "white",
        padding: "10px",
        borderRadius: "3px",
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
    const clickCancelButton = ()=>{
        props.setCheckedStatuses(props.beforeCheckedStatuses);
        props.setOpenStatusFilter(false)
    }
    const clickEnterButton = ()=>{
        props.setBeforeCheckedStatuses(props.checkedStatuses);
        let text = "";
        props.checkedStatuses.map((status)=>
            text = text + status.status_name + " "
        );
        if(text == ""){
            text = "条件なし";
        }
        props.setOpenStatusFilter(false);
        props.setTargetStatusText(text);
    }


    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent}>
                    ステータスモーダルコンポーネント
                    <FilterStatus
                        statuses={props.statuses} 
                        checkedStatuses={props.checkedStatuses}
                        setCheckedStatuses={props.setCheckedStatuses}
                    />
                    <button onClick={clickEnterButton}>決定</button>
                    <button onClick={clickCancelButton}>クローズ</button>
                </span>
            </span>
        </div>
    )
}

export default FilterStatusModal;