import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import QuestionContent from './QuestionContent';


function QuestionList(props) {
    return (
        <div>
            {props.mylists.map((mylist) => 
                <div key={mylist.mylist_id}>
                    <QuestionContent
                        question={mylist.question}
                        mylistId={mylist.mylist_id}
                        deleteMylist={props.deleteMylist}
                    />
                </div>
            )}
        </div>
    );
}

export default QuestionList;