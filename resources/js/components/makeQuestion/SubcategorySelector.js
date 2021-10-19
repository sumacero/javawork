import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function SubcategorySelector(props) {
    const subcategoryIdRegister = props.register("subcategory_id", {
        required: "選択してください"
    })
    return (
        <div>
            <label>サブカテゴリ</label>
            <select
                className={props.errors.subcategory_id ? 'invalid' : 'valid'}
                {...subcategoryIdRegister}
            >
                <option hidden></option>
                {props.targetSubcategories.map((subcategory) => 
                    <option
                        key={subcategory.subcategory_id}
                        value={subcategory.subcategory_id}
                    >
                    {subcategory.subcategory_name}
                    </option>
                )}
            </select>
            {props.errors.subcategory_id && <span className="text-danger">{props.errors.subcategory_id.message}</span>}
        </div>
    );
}

export default SubcategorySelector;