import React, { useEffect, useState } from 'react';
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
    const [beforeCheckedSubcategoryIds, setBeforeCheckedSubcategoryIds] = useState([]);
    const clickCancelButton = ()=>{
        props.setCheckedSubcategoryIds(props.beforeCheckedSubcategoryIds);
        props.setOpenCategoryFilter(false);
    }
    const clickEnterButton = ()=>{
        props.setBeforeCheckedSubcategoryIds(props.checkedSubcategoryIds);
        let text = "";
        props.checkedSubcategoryIds.map((subcategoryId) =>
            text = text + props.subcategories.find(subcategory => subcategory.subcategory_id == subcategoryId).subcategory_name + " "
        );
        if(text == ""){
            text = "条件なし";
        }
        props.setOpenCategoryFilter(false);
        props.setTargetCategoryText(text);
    }
    return(
        <div>
            <span id="overlay" style={overlay}>
                <span id="modalContent" style={modalContent} className="overflow-auto">
                    <p>カテゴリを選択してください</p>
                    <FilterCategory
                        categories={props.categories} 
                        subcategories={props.subcategories} 
                        checkedSubcategoryIds={props.checkedSubcategoryIds}
                        setCheckedSubcategoryIds={props.setCheckedSubcategoryIds}
                    />
                    <button className="btn btn-primary btn-block" onClick={clickEnterButton}>決定</button>
                    <button className="btn btn-primary btn-block" onClick={clickCancelButton}>キャンセル</button>
                </span>
            </span>
        </div>
    )
}

export default FilterCategoryModal;