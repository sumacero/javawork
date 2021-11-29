import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function CategoryCheckbox(props) {
    //チェック済み管理用状態
    const [checkedSubcategories, setCheckedSubcategories] = useState([]);

    const targetSubcategories = (category_id) => {
        return props.subcategories.filter(subcategory => subcategory.category_id == category_id);
    }
    const categoryCheck = (event) =>{
        const category_id = event.target.value;
        if(event.target.checked){
            setCheckedSubcategories([...checkedSubcategories.concat(targetSubcategories(category_id))]);
        }else{
            setCheckedSubcategories([...checkedSubcategories.filter((item) => item.category_id != category_id)]);
        }
    }
    const toggleChecked = (target) => {
        if (checkedSubcategories.includes(target)) {
            setCheckedSubcategories([...checkedSubcategories.filter((item) => item !== target)]);
        } else {
            setCheckedSubcategories([...checkedSubcategories.concat([target])]);
        }
    };

    return (
        <div className="row">
        {props.categories.map(item =>
            <div className="col" key={item.category_id}>
                <input 
                    id={"category" + item.category_id}
                    type="checkbox"
                    name={"categories"}
                    value={item.category_id}
                    onClick={categoryCheck}
                />
                <label className="h5" htmlFor={"category" + item.category_id}>{item.category_name}</label>
                {targetSubcategories(item.category_id).map(item =>
                    <div className="col" key={item.subcategory_id}>
                        <input 
                            id={"subcategory" + item.subcategory_id}
                            type="checkbox"
                            name={"subcategories[" + item.subcategory_id +"]"}
                            checked={checkedSubcategories.includes(item)}
                            onChange={() => toggleChecked(item)}
                        />
                        <label htmlFor={"subcategory" + item.subcategory_id}>{item.subcategory_name}</label>
                    </div>
                )}
            </div>
        )}
        </div>
    );
}

export default CategoryCheckbox;