import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Pagination from './Pagination';
import QuestionTable from './QuestionTable';

function SearchPage(){
    const [paginationData, setPaginationData] = useState([]);
    return(
        <div className="container">
            <Pagination paginationData={paginationData}/>
            <QuestionTable setPaginationData={setPaginationData}/>
        </div>
    )
}

if (document.getElementById('search-page')) {
    ReactDOM.render(<SearchPage />, document.getElementById('search-page'));
}