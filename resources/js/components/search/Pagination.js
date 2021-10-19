import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

function Pagination(props){
    return(
        <div className="container">
            <nav aria-label="Page Navigation">
                <ul className="pagination">
                    <li className="page-item">
                        <span className="page-link">前</span>
                    </li>
                    <li className="page-item">
                        <span className="page-link ">{props.paginationData.current_page}</span>
                    </li>
                    <li className="page-item">
                        <span  className="page-link">次</span>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default Pagination;