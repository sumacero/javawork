import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function CategoryCheckbox(props) {
    const workbookCheck = (event) =>{
        const checkedWorkbookId = event.target.value;
        const checkedWorkbookQuestionCount = props.workbooks
            .find(workbook => workbook.workbook_id == checkedWorkbookId).question_count;
        const targetCategories = props.categories.filter(category => category.workbook_id == checkedWorkbookId);
        const targetCategoryIds = targetCategories.map(category => String(category.category_id));
        let beforeCategoryIds = [];
        if(props.getValues("category_ids")){
            beforeCategoryIds = props.getValues("category_ids");
        }
        let afterCategoryIds = [];
        let questionCount = 0;
        // チェックされた場合
        if(event.target.checked){
            const aleadyCheckdCategories = targetCategories
                .filter(targetCategory=>beforeCategoryIds.includes(String(targetCategory.category_id)));
            let aleadyCheckdCategoriesQuestionCount = 0;
            aleadyCheckdCategories.forEach(
                category=>{
                    aleadyCheckdCategoriesQuestionCount = aleadyCheckdCategoriesQuestionCount + category.question_count;
                }
            );
            questionCount = props.targetQuestionCount + checkedWorkbookQuestionCount - aleadyCheckdCategoriesQuestionCount;
            afterCategoryIds = Array.from(new Set(beforeCategoryIds.concat(targetCategoryIds)));
        // チェックが解除された場合
        }else{
            const aleadyUncheckdCategories = targetCategories
                .filter(targetCategory=>!(beforeCategoryIds.includes(String(targetCategory.category_id))));
            let aleadyUncheckdCategoriesQuestionCount = 0;
            aleadyUncheckdCategories.forEach(
                category=>{
                    aleadyUncheckdCategoriesQuestionCount = aleadyUncheckdCategoriesQuestionCount + category.question_count;
                }
            );
            questionCount = props.targetQuestionCount - checkedWorkbookQuestionCount + aleadyUncheckdCategoriesQuestionCount;
            afterCategoryIds = beforeCategoryIds.filter(value => !targetCategoryIds.includes(value));
        }
        props.setValue("category_ids", afterCategoryIds);
        props.setTargetQuestionCount(questionCount);
    }
    const categoryCheck = (event)=>{
        const checkedCategoryId = event.target.value;
        const checkedCategoryQuestionCount = props.categories
            .find(category => category.category_id == checkedCategoryId).question_count;
        // チェックされた場合
        if(event.target.checked){
            props.setTargetQuestionCount(prevState => prevState + checkedCategoryQuestionCount);
        // チェックが解除された場合
        }else{
            props.setTargetQuestionCount(prevState => prevState - checkedCategoryQuestionCount);
        }
    }
    return (
        <div>
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
                    <label className="h5" htmlFor={"workbook"+item.workbook_id}>
                        {item.workbook_name}_({item.question_count})
                    </label>
                    {props.categories.filter(category => category.workbook_id == item.workbook_id).map(item =>
                        <div className="col" key={item.category_id}>
                            <input 
                                id={"category" + item.category_id}
                                value={item.category_id}
                                type="checkbox"
                                {...props.register("category_ids", {onChange: (e)=>categoryCheck(e), onBlur: ()=>{}})}
                                //{...props.register("category_ids")}
                            />
                            <label htmlFor={"category" + item.category_id}>
                                {item.category_name}_({item.question_count})
                            </label>
                        </div>
                    )}
                </div>
            )}
            </div>
            <div className="row">
            {props.errors.category_ids && 
                <span className="text-danger">{props.errors.category_ids.message}</span>
            }
            </div>
        </div>
    );
}

export default CategoryCheckbox;