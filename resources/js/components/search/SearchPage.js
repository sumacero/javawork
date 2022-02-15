import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterMenuArea from './FilterMenuArea';
import Pagination from './Pagination';
import QuestionList from './QuestionList';
//import QuestionTable from './QuestionTable';

function SearchPage(){
    const [ loginUser, setLoginUser] = useState();
    const [ openFilterWindow, setOpenFilterWindow] = useState(false);
    const [ statuses, setStatuses] = useState([]);
    const [ checkedStatusIds, setCheckedStatusIds] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    const [ checkedSubcategoryIds, setCheckedSubcategoryIds] = useState([]);
    const [ keyword, setKeyword] = useState("");
    const [ paginationData, setPaginationData] = useState([]);
    const [ questions, setQuestions] = useState([]);
    useEffect(() => {
        getLoginUser();
        getStatuses();
        getCategories();
        getQuestions();
    },[]);
    const getLoginUser = async () => {
            const result = await axios.get('get-login-user');
            const data = result.data;
            setLoginUser(JSON.parse(JSON.stringify(data.loginUser)));
    };
    const getStatuses = async () => {
            const result = await axios.get('get-statuses');
            const data = result.data;
            setStatuses(JSON.parse(JSON.stringify(data.statuses)));
    };
    const getCategories = async () => {
            const result = await axios.get('get-categories');
            const data = result.data.dbData;
            setCategories(JSON.parse(JSON.stringify(data.categories)));
            setSubcategories(JSON.parse(JSON.stringify(data.subcategories)));
    };
    const getQuestions = async () => {
        const response = await axios.get('get-questions', {
            params:{
                "page":1
            }
        });
        let dbData = response.data.dbData;
        let questions = dbData.data;
        let paginationData = {
            "total": dbData.total,
            "per_page": dbData.per_page,
            "current_page": dbData.current_page,
            "last_page": dbData.last_page,
            "next_page_url": dbData.next_page_url,
            "prev_page_url": dbData.prev_page_url,
            "from": dbData.from,
            "to": dbData.to,
        };
        setQuestions(questions);
        setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }
    const filterQuestions = async (page) => {
        const response = await axios.get('filter-questions', {
            params:{
                "page":page,
                "status_ids":JSON.stringify(checkedStatusIds),
                "subcategory_ids":JSON.stringify(checkedSubcategoryIds),
                "keyword":keyword
            }
        });
        let dbData = response.data.dbData;
        let questions = dbData.data;
        let paginationData = {
            "total": dbData.total,
            "per_page": dbData.per_page,
            "current_page": dbData.current_page,
            "last_page": dbData.last_page,
            "next_page_url": dbData.next_page_url,
            "prev_page_url": dbData.prev_page_url,
            "from": dbData.from,
            "to": dbData.to,
        };
        setQuestions(questions);
        setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }
    return(
        <div className="container">
            <FilterMenuArea
                setOpenFilterWindow={setOpenFilterWindow}
                statuses={statuses}
                checkedStatusIds={checkedStatusIds}
                setCheckedStatusIds={setCheckedStatusIds}
                categories={categories} 
                subcategories={subcategories} 
                checkedSubcategoryIds={checkedSubcategoryIds}
                setCheckedSubcategoryIds={setCheckedSubcategoryIds}
                keyword={keyword}
                setKeyword={setKeyword}
                filterQuestions={filterQuestions}
            />
            <Pagination setPaginationData={setPaginationData} paginationData={paginationData} setQuestions={setQuestions} filterQuestions={filterQuestions}/>
            <QuestionList loginUser={loginUser} questions={questions}/>
        </div>
    )
}

if (document.getElementById('search-page')) {
    ReactDOM.render(<SearchPage />, document.getElementById('search-page'));
}