import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function CategoryCheckbox(props) {
    const targetCategories = (workbook_id) => {
        return props.categories.filter(category => category.workbook_id == workbook_id);
    }
    const workbookCheck = (event) =>{
        const workbook_id = event.target.value;
        if(event.target.checked){
            //現在のチェック項目と新規追記項目を統合
            let tmpArray = [...props.checkedCategories.concat(targetCategories(workbook_id))]
            //項目の重複を配列から削除し、ソート
            tmpArray = Array.from(new Set(tmpArray)).sort((a,b)=>a.category_id - b.category_id);
            props.setCheckedCategories(tmpArray);
        }else{
            props.setCheckedCategories([...props.checkedCategories.filter((item) => item.workbook_id != workbook_id)]);
        }
    }
    const toggleChecked = (target) => {
        if (props.checkedCategories.includes(target)) {
            props.setCheckedCategories([...props.checkedCategories.filter((item) => item !== target)]);
        } else {
            props.setCheckedCategories([...props.checkedCategories.concat([target])]);
        }
    };

    return (
        <form>
            <div className="row">
            {props.workbooks.map(item =>
                <div className="col" key={item.workbook_id}>
                    <input 
                        id={"workbook" + item.workbook_id}
                        type="checkbox"
                        name={"workbooks"}
                        value={item.workbook_id}
                        onClick={workbookCheck}
                    />
                    <label className="h5" htmlFor={"workbook" + item.workbook_id}>{item.workbook_name}</label>
                    {targetCategories(item.workbook_id).map(item =>
                        <div className="col" key={item.category_id}>
                            <input 
                                id={"category" + item.category_id}
                                type="checkbox"
                                name={"categories[" + item.category_id +"]"}
                                checked={props.checkedCategories.includes(item)}
                                onChange={() => toggleChecked(item)}
                            />
                            <label htmlFor={"category" + item.category_id}>{item.category_name}</label>
                        </div>
                    )}
                </div>
            )}
            </div>
        </form>
    );
}

export default CategoryCheckbox;