import React, { useEffect, useState} from 'react';

function ExaminationResultTable(props) {
    const clickQuestion = (question_id) => {
        //問題画面を別タブで開く
        //location.href = "question/" + question_id;
        const url = "../question/" + question_id;
        let newwin = open(url);
    }
    const [ onMouseIndex, setOnMouseIndex] = useState(-1);
    const recordStyle = (isCorrect, id) => (
        {backgroundColor:isCorrect ? "paleturquoise" : "mistyrose", color:id==onMouseIndex ? "blue" : "black"}
    );
    const onMouseEvent = (index)=>{
        setOnMouseIndex(index);
    }
    const outMouseEvent = (index)=>{
        setOnMouseIndex(-1);
    }
    return (
        <table className="table">
            <thead>
                <tr>
                    <th>出題番号</th>
                    <th>正解/不正解</th>
                    <th>正答</th>
                    <th>あなたの回答</th>
                    <th>書籍</th>
                    <th>カテゴリ</th>
                    <th>問題番号</th>
                </tr>
            </thead>
            <tbody>
            {props.examinationQuestions?.map((examinationQuestion, index) =>
                <tr
                    key={index}
                    onClick={()=>clickQuestion(examinationQuestion.question_id)}
                    style={recordStyle(Number(examinationQuestion.is_answered_correct), index)}
                    onMouseEnter={()=>onMouseEvent(index)}
                    onMouseLeave={()=>outMouseEvent(index)}
                >
                    <td>{index+1}</td>
                    <td>{Number(examinationQuestion.is_answered_correct) ? "○" : "×"}</td>
                    <td>{examinationQuestion.correct_choice_symbol_string}</td>
                    <td>{examinationQuestion.answered_choice_symbol_string}</td>
                    <td>{examinationQuestion.question.category.workbook.workbook_name}</td>
                    <td>{examinationQuestion.question.category.category_name}</td>
                    <td>{examinationQuestion.question.question_number}</td>
                </tr>
            )}
            </tbody>
        </table>
    );
}

export default ExaminationResultTable;
