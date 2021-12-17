import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterMenuArea from './FilterMenuArea';
import Pagination from './Pagination';
import QuestionTable from './QuestionTable';

function SearchPage(){
    const [ openFilterWindow, setOpenFilterWindow] = useState(false);
    const [ statuses, setStatuses] = useState([]);
    const [ checkedStatuses, setCheckedStatuses] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    const [ checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [ paginationData, setPaginationData] = useState([]);
    const [ questions, setQuestions] = useState([]);
    useEffect(() => {
        getStatuses();
        getCategories();
        getQuestions();
    },[]);
    const getStatuses = async () => {
            const result = await axios.get('/get-statuses');
            const data = result.data;
            setStatuses(JSON.parse(JSON.stringify(data.statuses)));
    };
    const getCategories = async () => {
            const result = await axios.get('/get-categories');
            const data = result.data.dbData;
            setCategories(JSON.parse(JSON.stringify(data.categories)));
            setSubcategories(JSON.parse(JSON.stringify(data.subcategories)));
    };
    const getQuestions = async () => {
        const response = await axios.get('/get-questions', {
            params:{
                "page":1
            }
        });
        let questions = response.data.questions.data;
        let paginationData = {
            "total": response.data.questions.total,
            "per_page": response.data.questions.per_page,
            "current_page": response.data.questions.current_page,
            "last_page": response.data.questions.last_page,
            "next_page_url": response.data.questions.next_page_url,
            "prev_page_url": response.data.questions.prev_page_url,
            "from": response.data.questions.from,
            "to": response.data.questions.to,
        };
        setQuestions(questions);
        setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }
    const filterQuestions = async () => {
        const response = await axios.post('/filter-questions', {
            params:{
                "page":1,
                "statuses":JSON.stringify(checkedStatuses),
                "subcategories":JSON.stringify(checkedSubcategories),
            }
        });
        let questions = response.data.questions.data;
        let paginationData = {
            "total": response.data.questions.total,
            "per_page": response.data.questions.per_page,
            "current_page": response.data.questions.current_page,
            "last_page": response.data.questions.last_page,
            "next_page_url": response.data.questions.next_page_url,
            "prev_page_url": response.data.questions.prev_page_url,
            "from": response.data.questions.from,
            "to": response.data.questions.to,
        };
        setQuestions(questions);
        setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }
    return(
        <div className="container">
            <FilterMenuArea
                setOpenFilterWindow={setOpenFilterWindow}
                statuses={statuses}
                checkedStatuses={checkedStatuses}
                setCheckedStatuses={setCheckedStatuses}
                categories={categories} 
                subcategories={subcategories} 
                checkedSubcategories={checkedSubcategories}
                setCheckedSubcategories={setCheckedSubcategories}
                filterQuestions={filterQuestions}
            />
            <Pagination setPaginationData={setPaginationData} paginationData={paginationData} setQuestions={setQuestions}/>
            <QuestionTable questions={questions}/>
        </div>
    )
}

if (document.getElementById('search-page')) {
    ReactDOM.render(<SearchPage />, document.getElementById('search-page'));
}