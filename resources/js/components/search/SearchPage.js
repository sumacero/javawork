import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import FilterMenuArea from './FilterMenuArea';
import Pagination from './Pagination';
import QuestionList from './QuestionList';
//import QuestionTable from './QuestionTable';

function SearchPage(){
    const [ openFilterWindow, setOpenFilterWindow] = useState(false);
    const [ statuses, setStatuses] = useState([]);
    const [ checkedStatuses, setCheckedStatuses] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    const [ checkedSubcategories, setCheckedSubcategories] = useState([]);
    const [ keyword, setKeyword] = useState("");
    const [ paginationData, setPaginationData] = useState([]);
    const [ questions, setQuestions] = useState([]);
    const [ choices, setChoices] = useState([]);
    const [ answers, setAnswers] = useState([]);
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
        console.log(response.data);
        let dbData = response.data.dbData;
        let questions = dbData.questions.data;
        let choices = dbData.choices;
        let answers = dbData.answers;
        let paginationData = {
            "total": dbData.questions.total,
            "per_page": dbData.questions.per_page,
            "current_page": dbData.questions.current_page,
            "last_page": dbData.questions.last_page,
            "next_page_url": dbData.questions.next_page_url,
            "prev_page_url": dbData.questions.prev_page_url,
            "from": dbData.questions.from,
            "to": dbData.questions.to,
        };
        setQuestions(questions);
        setChoices(choices);
        setAnswers(answers);
        setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }
    const filterQuestions = async () => {
        const response = await axios.post('/filter-questions', {
            params:{
                "page":1,
                "statuses":JSON.stringify(checkedStatuses),
                "subcategories":JSON.stringify(checkedSubcategories),
                "keyword":keyword
            }
        });
        console.log(response.data);
        let dbData = response.data.dbData;
        let questions = dbData.questions.data;
        let choices = dbData.choices;
        let answers = dbData.answers;
        let paginationData = {
            "total": dbData.questions.total,
            "per_page": dbData.questions.per_page,
            "current_page": dbData.questions.current_page,
            "last_page": dbData.questions.last_page,
            "next_page_url": dbData.questions.next_page_url,
            "prev_page_url": dbData.questions.prev_page_url,
            "from": dbData.questions.from,
            "to": dbData.questions.to,
        };
        setQuestions(questions);
        setChoices(choices);
        setAnswers(answers);
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
                keyword={keyword}
                setKeyword={setKeyword}
                filterQuestions={filterQuestions}
            />
            <Pagination setPaginationData={setPaginationData} paginationData={paginationData} setQuestions={setQuestions}/>
            <QuestionList questions={questions} choices={choices} answers={answers}/>
        </div>
    )
}

if (document.getElementById('search-page')) {
    ReactDOM.render(<SearchPage />, document.getElementById('search-page'));
}