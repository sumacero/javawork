import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Pagination(props){
    const getQuestions = async (move_page) => {
        const response = await axios.get('/get-questions', {
            params:{
                page:move_page
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
        props.setQuestions(questions);
        props.setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }
    const clickPrevButton = (event) =>{
        if(props.paginationData.current_page == 1) return;
        getQuestions(props.paginationData.current_page - 1);
    }
    const clickNextButton = (event) =>{
        if(props.paginationData.current_page == props.paginationData.last_page) return;
        getQuestions(props.paginationData.current_page + 1);
    }
    return(
        <div className="container">
            <nav aria-label="Page Navigation">
                <ul className="pagination">
                    <li className="page-item">
                        <span className="page-link" onClick={clickPrevButton}>前</span>
                    </li>
                    <li className="page-item">
                        <span className="page-link ">{props.paginationData.current_page}</span>
                    </li>
                    <li className="page-item">
                        <span  className="page-link" onClick={clickNextButton}>次</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;