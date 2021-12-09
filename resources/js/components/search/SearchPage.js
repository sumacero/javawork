import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from './Pagination';
import QuestionTable from './QuestionTable';

function SearchPage(){
    const [paginationData, setPaginationData] = useState([]);
    const [questions, setQuestions] = useState([]);
    useEffect(() => {
        getQuestions()
    },[])
    const getQuestions = async () => {
        const response = await axios.get('/get-questions', {
            params:{
                page:1
            }
        });
        //console.log("response")
        //console.log(response)
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
            <Pagination setPaginationData={setPaginationData} paginationData={paginationData} setQuestions={setQuestions}/>
            <QuestionTable questions={questions}/>
        </div>
    )
}

if (document.getElementById('search-page')) {
    ReactDOM.render(<SearchPage />, document.getElementById('search-page'));
}