import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterStatus from './FilterStatus';


function FilterStatusModal(props){
    const modalContent = {
        background: "white",
        padding: "10px",
        borderRadius: "3px",
        width: "90%",
        height: "90%",
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
        props.setCheckedStatusIds(props.beforeCheckedStatusIds);
        props.setOpenStatusFilter(false)
    }
    const clickEnterButton = ()=>{
        props.setBeforeCheckedStatusIds(props.checkedStatusIds);
        let text = "";
        props.checkedStatusIds.map((statusId)=>
            text = text + props.statuses.find(status => status.status_id == statusId).status_name + " "
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
                <span id="modalContent" style={modalContent} className="overflow-auto">
                    <p>ステータスを選択してください</p>
                    <FilterStatus
                        statuses={props.statuses} 
                        checkedStatusIds={props.checkedStatusIds}
                        setCheckedStatusIds={props.setCheckedStatusIds}
                    />
                    <button className="btn btn-primary btn-block" onClick={clickEnterButton}>決定</button>
                    <button className="btn btn-primary btn-block" onClick={clickCancelButton}>キャンセル</button>
                </span>
            </span>
        </div>
    )
}

export default FilterStatusModal;