import React, { useCallback, useEffect, useState, useRef } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterCategory from './FilterCategory';


function FilterCategoryModal(props){
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
        props.setCheckedCategoryIds(props.beforeCheckedCategoryIds);
        props.setOpenCategoryFilter(false);
        document.removeEventListener('click',closeModal);
    }
    const clickEnterButton = ()=>{
        props.setBeforeCheckedCategoryIds(props.checkedCategoryIds);
        let text = "";
        props.checkedCategoryIds.map((categoryId) =>
            text = text + props.categories.find(category => category.category_id == categoryId).category_name + " "
        );
        if(text == ""){
            text = "条件なし";
        }
        props.setTargetCategoryText(text);
        props.setOpenCategoryFilter(false);
        document.removeEventListener('click',closeModal);
    }
    useEffect
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto" ref={modalRef}>
                    <p>カテゴリを選択してください</p>
                    <FilterCategory
                        workbooks={props.workbooks} 
                        categories={props.categories} 
                        checkedCategoryIds={props.checkedCategoryIds}
                        setCheckedCategoryIds={props.setCheckedCategoryIds}
                    />
                    <button className="btn btn-primary btn-block" onClick={clickEnterButton}>決定</button>
                    <button className="btn btn-primary btn-block" onClick={clickCancelButton}>キャンセル</button>
                </span>
            </span>
        </div>
    )
}

export default FilterCategoryModal;