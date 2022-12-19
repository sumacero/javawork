import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CategoryCheckbox from './CategoryCheckbox';

function PracticeMenu(props){
    const [ workbooks, setWorkbooks] = useState([]);
    const [ categories, setCategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('get-categories');
            const data = result.data.dbData;
            setWorkbooks(JSON.parse(JSON.stringify(data.workbooks)));
            setCategories(JSON.parse(JSON.stringify(data.categories)));
        };
        fetchData();
    },[]);
    return (
        <div className="container">
            <p>問題数:{props.targetQuestionCount}</p>
            <button 
                className="btn btn-success btn-block mb-3"
                onClick={props.clickStartButton}
                disabled={props.targetQuestionCount === 0}
            >
                出題開始
            </button>
            <CategoryCheckbox
                workbooks={workbooks} 
                categories={categories} 
                checkedCategories={props.checkedCategories}
                setCheckedCategories={props.setCheckedCategories}
            />
        </div>
    );
}
export default PracticeMenu;
