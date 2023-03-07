import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CategoryCheckbox from './CategoryCheckbox';

function RandomQuestionSettingPage(props){
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [ workbooks, setWorkbooks] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ checkedCategories, setCheckedCategories] = useState([]);
    const [ targetQuestionCount, setTargetQuestionCount] = useState(0);
    const getTargetQuestionCount = async () => {
        const checkedCategoryIds = checkedCategories.map((category)=>category.category_id);
        const result = await axios.post('get-target-question-count', checkedCategoryIds);
        const data = result.data;
        setTargetQuestionCount(data.target_question_count);
    };
    //出題設定データをPOSTしランダム出題画面へ移動する
    const clickStartButton =()=>{
        const categoryIds = checkedCategories.map((category)=>category.category_id);
        let form = document.createElement('form');   
        form.method = 'post';
        form.action = 'random-question';
        form.innerHTML = '<input type="hidden" name="_token" value=' + csrf_token + '>'
            + '<input type="hidden" name="category_ids" value=' + categoryIds + '>';
        document.body.append(form);
        form.submit();
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('get-categories');
            const data = result.data.dbData;
            setWorkbooks(JSON.parse(JSON.stringify(data.workbooks)));
            setCategories(JSON.parse(JSON.stringify(data.categories)));
        };
        fetchData();
    },[]);
    useEffect(() => {
        if(checkedCategories.length>0){
            getTargetQuestionCount();
        }else{
            setTargetQuestionCount(0);
        }
    },[checkedCategories]);
    return (
        <div className="container">
            <p>問題数:{targetQuestionCount}</p>
            <button 
                className="btn btn-success btn-block mb-3"
                onClick={clickStartButton}
                disabled={targetQuestionCount === 0}
            >
                出題開始
            </button>
            <CategoryCheckbox
                workbooks={workbooks} 
                categories={categories} 
                checkedCategories={checkedCategories}
                setCheckedCategories={setCheckedCategories}
            />
            <input type="hidden" name="_token" value={csrf_token} />
        </div>
    );
}

if (document.getElementById('random-question-setting-page')) {
    ReactDOM.render(<RandomQuestionSettingPage />,document.getElementById('random-question-setting-page'));
}
