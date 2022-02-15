import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Pagination(props){
    const clickPrevButton = (event) =>{
        if(props.paginationData.current_page == 1) return;
        props.filterQuestions(props.paginationData.current_page - 1);
    }
    const clickNextButton = (event) =>{
        if(props.paginationData.current_page == props.paginationData.last_page) return;
        props.filterQuestions(props.paginationData.current_page + 1);
    }
    const clickFirstButton = (event) =>{
        props.filterQuestions(1);
    }
    const clickLastButton = (event) =>{
        props.filterQuestions(props.paginationData.last_page);
    }
    return(
        <div className="container">
            <nav aria-label="Page Navigation">
                <ul className="pagination">
                    <li className={props.paginationData.current_page==1 ? "page-item disabled" : "page-item"}>
                        <span className="page-link" onClick={clickPrevButton}>前</span>
                    </li>
                    { props.paginationData.current_page>1 &&
                        <li className="page-item">
                            <span className="page-link" onClick={clickFirstButton}>1</span>
                        </li>
                    }
                    { props.paginationData.current_page>2 &&
                        <li className="page-item">
                            <span className="page-link ">...</span>
                        </li>
                    }
                    <li className="page-item active">
                        <span className="page-link ">{props.paginationData.current_page}</span>
                    </li>
                    { props.paginationData.current_page + 1 < props.paginationData.last_page &&
                        <li className="page-item">
                            <span className="page-link ">...</span>
                        </li>
                    }
                    { props.paginationData.current_page < props.paginationData.last_page &&
                        <li className="page-item">
                            <span className="page-link" onClick={clickLastButton}>{props.paginationData.last_page}</span>
                        </li>
                    }
                    <li className={props.paginationData.current_page==props.paginationData.last_page ? "page-item disabled" : "page-item"}>
                        <span  className="page-link" onClick={clickNextButton}>次</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;