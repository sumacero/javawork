import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function CategorySelector(props) {
    const categoryIdRegister = props.register("category_id", {});
    return (
        <div>
            <label>カテゴリ</label><br/>
            <select
                className={props.errors.category_id ? 'invalid' : 'valid'}
                {...categoryIdRegister}
            >
                <option hidden></option>
                {props.targetCategories.map((category) => 
                    <option
                        key={category.category_id}
                        value={category.category_id}
                    >
                    {category.category_name}
                    </option>
                )}
            </select>
            {props.errors.category_id && <span className="text-danger">{props.errors.category_id.message}</span>}
        </div>
    );
}

export default CategorySelector;