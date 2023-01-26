import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function WorkbookSelector(props) {
    const workbookIdRegister = props.register("workbook_id", {});
    const selectChange = (event) => {
        const selectedWorkbookId = event.target.value;
        const targetCategories = props.categories.
            filter(category => category.workbook_id == selectedWorkbookId);
        props.setTargetCategories(targetCategories);
    };
    return (
        <div>
            <label>書籍</label><br/>
            <select
                className={props.errors.workbook_id ? 'invalid' : 'valid'}
                {...workbookIdRegister}
                onChange={selectChange}
            >
            <option hidden value=""></option>
            {props.workbooks.map((workbook) =>
                <option
                    key={workbook.workbook_id}
                    value={workbook.workbook_id}
                >
                {workbook.workbook_name}
                </option>
            )}
            </select>
            {props.errors.workbook_id && <span className="text-danger">{props.errors.workbook_id.message}</span>}
        </div>
    );
}

export default WorkbookSelector;