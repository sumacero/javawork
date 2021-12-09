import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';


function QuestionTable(props) {
    const clickQuestionButton = (question_id) => {
        //編集画面へ移動する
        location.href = "../question/" + question_id;
    }
    const clickEditButton = (question_id) => {
        //編集画面へ移動する
        location.href = "../edit-question?question_id=" + question_id;
    }
    return (
        <div>
            <table className="table table-bordered table-striped">
                <thead>
                    <tr>
                        <th className="col-md-1">操作</th>
                        <th>ID</th>
                        <th className="col-md-1">ステータス</th>
                        <th className="col-md-1">サブカテゴリ</th>
                        <th className="col-md-1">カテゴリ</th>
                        <th>問題文</th>
                        <th>作成者</th>
                        <th>更新者</th>
                    </tr>
                </thead>
                <tbody>
                    {props.questions.map((question) => <tr key={question.question_id}>
                        <td>
                            {question.status_id == 1 &&
                            <button className="btn btn-success" onClick={()=>clickQuestionButton(question.question_id)}>出題</button>
                            }
                            <button className="btn btn-success" onClick={()=>clickEditButton(question.question_id)}>編集</button>
                        </td>
                        <td>{question.question_id}</td>
                        <td>{question.status.status_name}</td>
                        <td>{question.subcategory && question.subcategory.subcategory_name}</td>
                        <td>{question.subcategory && question.subcategory.category.category_name}</td>
                        <td>{question.question_text}</td>
                        <td>{question.createuser.name}</td>
                        <td>{question.updateuser.name}</td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    );
}

export default QuestionTable;