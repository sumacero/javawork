import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function CategoryCheckbox(props) {
    const targetSubcategories = (category_id) => {
        return props.subcategories.filter(subcategory => subcategory.category_id == category_id);
    }
    const categoryCheck = (event) =>{
        const category_id = event.target.value;
        if(event.target.checked){
            props.setCheckedSubcategories([...props.checkedSubcategories.concat(targetSubcategories(category_id))]);
        }else{
            props.setCheckedSubcategories([...props.checkedSubcategories.filter((item) => item.category_id != category_id)]);
        }
    }
    const toggleChecked = (target) => {
        if (props.checkedSubcategories.includes(target)) {
            props.setCheckedSubcategories([...props.checkedSubcategories.filter((item) => item !== target)]);
        } else {
            props.setCheckedSubcategories([...props.checkedSubcategories.concat([target])]);
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

export default CategoryCheckbox;