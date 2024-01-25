import React, { useEffect, useState} from 'react';

function SelectedCategoryTable(props) {
    const isCheckd = (categoryId) => {
        const isCheckd = props.examinationCategories
            .map(examinationCategory=>examinationCategory.category_id)
            .includes(categoryId);
        return isCheckd;
    }
    return (
        <div className="row">
        {props.workbooks?.map((workbook, index) =>
            <div className="col" key={index}>
                ■{workbook.workbook_name}
                {props.categories?.filter((category)=>category.workbook_id == workbook.workbook_id).map(item =>
                    <div className="row" key={item.category_id}>
                        <div className="col">
                            {isCheckd(item.category_id) ?
                                item.category_name
                                :
                                <del>{item.category_name}</del>
                            }
                        </div>
                    </div>
                )}
            </div>
        )}
        </div>
    );
}

export default SelectedCategoryTable;
