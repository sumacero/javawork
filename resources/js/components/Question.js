import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function Question() {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestions()
    },[])

    const getQuestions = async () => {
        const response = await axios.get('/getQuestions');
        setQuestions(response.data.questions)
    }
    console.log(questions)

    return (
        <div>
            <h1>Questionビュー</h1>
            <table>
                <tbody>
                    <tr>
                        <th>question_id</th>
                        <th>created_user_id</th>
                        <th>updated_user_id</th>
                        <th>state_id</th>
                        <th>state_name</th>
                        <th>subcategory_id</th>
                        <th>subcategory_name</th>
                        <th>category_id</th>
                        <th>question_text</th>
                    </tr>
                    {questions.map((question) => <tr key={question.question_id}>
                                                    <td>{question.question_id}</td>
                                                    <td>{question.created_user_id}</td>
                                                    <td>{question.updated_user_id}</td>
                                                    <td>{question.status_id}</td>
                                                    <td>{question.status.status_name}</td>
                                                    <td>{question.subcategory_id}</td>
                                                    <td>{question.subcategory.subcategory_name}</td>
                                                    <td>{question.subcategory.category_id}</td>
                                                    <td>{question.question_text}</td>
                                                </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default Question;

if (document.getElementById('question')) {
    ReactDOM.render(<Question />, document.getElementById('question'));
}