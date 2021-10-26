import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function CategorySelector(props) {
    const categoryIdRegister = props.register("category_id", {});
    const selectChange = (event) => {
        const selectedCategoryId = event.target.value;
        const targetSubcategories = props.subcategories.
            filter(subcategory => subcategory.category_id == selectedCategoryId);
        props.setTargetSubcategories(targetSubcategories);
    };
    return (
        <div>
            <label>カテゴリ</label>
            <select
                className={props.errors.category_id ? 'invalid' : 'valid'}
                {...categoryIdRegister}
                onChange={selectChange}
            >
            <option hidden value=""></option>
            {props.categories.map((category) =>
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