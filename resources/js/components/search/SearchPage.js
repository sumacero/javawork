import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterMenuArea from './FilterMenuArea';
import Pagination from './Pagination';
import QuestionList from './QuestionList';
import { CSSTransition } from 'react-transition-group';

function SearchPage(){
    const [ loginUser, setLoginUser] = useState();
    const [ openFilterWindow, setOpenFilterWindow] = useState(false);
    const [ workbooks, setWorkbooks] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ checkedCategoryIds, setCheckedCategoryIds] = useState([]);
    const [ paginationData, setPaginationData] = useState([]);
    const [ questions, setQuestions] = useState([]);
    const [ activeQuestionId, setActiveQuestionId] = useState(-1);
    const [ popupFlag, setPopupFlag] = useState(false);
    const [ popupMsg, setPopupMsg] = useState("");

    useEffect(() => {
        getLoginUser();
        getCategories();
        getQuestions();
    },[]);
    const getLoginUser = async () => {
            const result = await axios.get('get-login-user');
            const data = result.data;
            setLoginUser(JSON.parse(JSON.stringify(data.loginUser)));
    };
    const getCategories = async () => {
            const result = await axios.get('get-categories');
            const data = result.data.dbData;
            setWorkbooks(JSON.parse(JSON.stringify(data.workbooks)));
            setCategories(JSON.parse(JSON.stringify(data.categories)));
    };
    const getQuestions = async () => {
        const response = await axios.get('get-questions', {
            params:{
                "page":1
            }
        });
        let data = response.data;
        let questions = data.dbData.data;
        let paginationData = {
            "total": data.dbData.total,
            "per_page": data.dbData.per_page,
            "current_page": data.dbData.current_page,
            "last_page": data.dbData.last_page,
            "next_page_url": data.dbData.next_page_url,
            "prev_page_url": data.dbData.prev_page_url,
            "from": data.dbData.from,
            "to": data.dbData.to,
        };
        setQuestions(questions);
        setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }
    const filterQuestions = async (page) => {
        const response = await axios.get('filter-questions', {
            params:{
                "page":page,
                "category_ids":JSON.stringify(checkedCategoryIds),
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
                workbooks={workbooks} 
                categories={categories} 
                checkedCategoryIds={checkedCategoryIds}
                setCheckedCategoryIds={setCheckedCategoryIds}
                filterQuestions={filterQuestions}
            />
            <Pagination
                setPaginationData={setPaginationData}
                paginationData={paginationData}
                filterQuestions={filterQuestions}
            />
            <QuestionList
                loginUser={loginUser}
                questions={questions}
                setActiveQuestionId={setActiveQuestionId}
            />
            <CSSTransition in={popupFlag} classNames="popup" timeout={2000}>
                <div>{popupMsg}</div>
            </CSSTransition>
        </div>
    )
}

if (document.getElementById('search-page')) {
    ReactDOM.render(<SearchPage />, document.getElementById('search-page'));
}