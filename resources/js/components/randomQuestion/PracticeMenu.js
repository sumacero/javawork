import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CategoryCheckbox from './CategoryCheckbox';

function PracticeMenu(props){
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/get-categories');
            const data = result.data.dbData;
            setCategories(JSON.parse(JSON.stringify(data.categories)));
            setSubcategories(JSON.parse(JSON.stringify(data.subcategories)));
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
                categories={categories} 
                subcategories={subcategories} 
                checkedSubcategories={props.checkedSubcategories}
                setCheckedSubcategories={props.setCheckedSubcategories}
            />
        </div>
    );
}
export default PracticeMenu;
