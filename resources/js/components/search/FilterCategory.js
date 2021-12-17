import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function FilterCategory(props) {
    const targetSubcategories = (category_id) => {
        return props.subcategories.filter(subcategory => subcategory.category_id == category_id);
    }
    const categoryCheck = (event) =>{
        const category_id = event.target.value;
        if(event.target.checked){
            //現在のチェック項目と新規追記項目を統合
            let tmpArray = [...props.checkedSubcategories.concat(targetSubcategories(category_id))]
            //項目の重複を配列から削除し、ソート
            tmpArray = Array.from(new Set(tmpArray)).sort((a,b)=>a.subcategory_id - b.subcategory_id);
            props.setCheckedSubcategories(tmpArray);
        }else{
            props.setCheckedSubcategories([...props.checkedSubcategories.filter((item) => item.category_id != category_id)]);
        }
    }
    const toggleChecked = (target) => {
        if (props.checkedSubcategories.includes(target)) {
            //チェック済みの場合は項目を削除
            props.setCheckedSubcategories(
                [...props.checkedSubcategories.filter((item) => item !== target)]
            );
        } else {
            //未チェックの場合は項目を追加しソート
            props.setCheckedSubcategories(
                [...props.checkedSubcategories.concat([target]).sort((a,b)=>a.subcategory_id - b.subcategory_id)]
            );
        }
    };

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
                        defaultChecked={props.checkedSubcategories.some(subcategory => subcategory.category_id == item.category_id)}
                        onClick={categoryCheck}
                    />
                    <label className="h5" htmlFor={"category" + item.category_id}>{item.category_name}</label>
                    {targetSubcategories(item.category_id).map(item =>
                        <div className="col" key={item.subcategory_id}>
                            <input 
                                id={"subcategory" + item.subcategory_id}
                                type="checkbox"
                                name={"subcategories[" + item.subcategory_id +"]"}
                                checked={props.checkedSubcategories.includes(item)}
                                onChange={() => toggleChecked(item)}
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