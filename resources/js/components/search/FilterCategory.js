import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function FilterCategory(props) {
    const targetSubcategories = (category_id) => {
        return props.subcategories.filter(subcategory => subcategory.category_id == category_id);
    }
    const categoryCheck = (event) =>{
        const category_id = event.target.value;
        if(event.target.checked){
            let newSubcategories = targetSubcategories(category_id)
            //現在のチェック項目と新規追記項目を統合
            let tmpArray = [...props.checkedSubcategoryIds.concat(newSubcategories.map((obj) => obj.subcategory_id))]
            //項目の重複を配列から削除し、ソート
            tmpArray = Array.from(new Set(tmpArray)).sort((a,b)=>a - b);
            props.setCheckedSubcategoryIds(tmpArray);
        }else{
            let checkedOffSubcategories = props.subcategories.filter((subcategory)=>subcategory.category_id == category_id)
            let checkedOffSubcategoryIds = checkedOffSubcategories.map((obj)=>obj.subcategory_id)
            props.setCheckedSubcategoryIds([...props.checkedSubcategoryIds.filter((item) => !checkedOffSubcategoryIds.includes(item))]);
        }
    }
    const toggleChecked = (target) => {
        if (props.checkedSubcategoryIds.includes(target)) {
            //チェック済みの場合は項目を削除
            props.setCheckedSubcategoryIds(
                [...props.checkedSubcategoryIds.filter((item) => item !== target)]
            );
        } else {
            //未チェックの場合は項目を追加しソート
            props.setCheckedSubcategoryIds(
                [...props.checkedSubcategoryIds.concat([target]).sort((a,b)=>a - b)]
            );
        }
    };

    const defaultCheckedFlag = (category_id) => {
        let defaultCheckedCount = targetSubcategories(category_id).filter(item => props.checkedSubcategoryIds.includes(item.subcategory_id)).length;
        return defaultCheckedCount>0;
    }

    return (
        <form>
            <div className="row">
            {props.categories.map(item =>
                <div className="col" key={item.category_id}>
                    <input 
                        id={"category" + item.category_id}
                        type="checkbox"
                        name={"categories"}
                        value={item.category_id}
                        defaultChecked={
                            defaultCheckedFlag(item.category_id)
                        }
                        onClick={categoryCheck}
                    />
                    <label className="h5" htmlFor={"category" + item.category_id}>{item.category_name}</label>
                    {targetSubcategories(item.category_id).map(item =>
                        <div className="col" key={item.subcategory_id}>
                            <input 
                                id={"subcategory" + item.subcategory_id}
                                type="checkbox"
                                name={"subcategories[" + item.subcategory_id +"]"}
                                checked={props.checkedSubcategoryIds.includes(item.subcategory_id)}
                                onChange={() => toggleChecked(item.subcategory_id)}
                            />
                            <label htmlFor={"subcategory" + item.subcategory_id}>{item.subcategory_name}</label>
                        </div>
                    )}
                </div>
            )}
            </div>
        </form>
    );
}

export default FilterCategory;