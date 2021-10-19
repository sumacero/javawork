import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function QuestionTable(props) {
    
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
        props.setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    }

    return (
        <div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th>question_id</th>
                        <th>state_name</th>
                        <th>subcategory_name</th>
                        <th>category_name</th>
                        <th>question_text</th>
                    </tr>
                </thead>
                <tbody>
                    {questions.map((question) => <tr key={question.question_id}>
                                                    <td><a href={"/question/" + question.question_id}>{question.question_id}</a></td>
                                                    <td>{question.status.status_name}</td>
                                                    <td>{question.subcategory.subcategory_name}</td>
                                                    <td>{question.subcategory.category.category_name}</td>
                                                    <td>{question.question_text}</td>
                                                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default QuestionTable;