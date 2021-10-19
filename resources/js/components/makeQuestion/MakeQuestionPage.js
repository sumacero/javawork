import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import QuestionEditor from './QuestionEditor';
import ChoicesEditor from './ChoicesEditor';
import ExplanationEditor from './ExplanationEditor';
import CategorySelector from './CategorySelector';
import SubcategorySelector from './SubcategorySelector';
import { useForm } from "react-hook-form";

function MakeQuestionPage(){
    const defaultValues = {
        "questionText":"",
        "choiceText":{
            "A":"",
            "B":"",
            "C":"",
            "D":"",
        },
        "answerText":"",
        "category_id":"",
        "subcategory_id":"",
        "correctChoiceSymbol":"",
    };
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    const [ targetSubcategories, setTargetSubcategories] = useState([]);
    const { register, setValue, getValues, handleSubmit, formState: { errors, isSubmitted}, clearErrors} = useForm({
        mode: 'onBlur', //カーソルを外したタイミングでチェック
        //mode: 'onSubmit',
        //reValidateMode: 'onSubmit',
        criteriaMode: "all",
        shouldFocusError: false, // エラーフォームのフォーカスを無効にする
        defaultValues: defaultValues,
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('/get-categories');
            const data = result.data.dbData;
            setCategories(JSON.parse(JSON.stringify(data.categories)));
            setSubcategories(JSON.parse(JSON.stringify(data.subcategories)));
        };
        fetchData();
    },[]); 
    return (
        <div className="container">
            <form onSubmit={handleSubmit(onSubmit)}>
                <QuestionEditor
                    register = {register}
                    errors = {errors}
                />
                <ChoicesEditor
                    setValue = {setValue}
                    getValues = {getValues}
                    register = {register}
                    errors = {errors}
                    clearErrors = {clearErrors}
                />
                <ExplanationEditor
                    register = {register}
                    errors = {errors}
                />
                <CategorySelector
                    register = {register}
                    errors = {errors}
                    categories = {categories}
                    setCategories = {setCategories}
                    subcategories = {subcategories}
                    setTargetSubcategories = {setTargetSubcategories}
                />
                <SubcategorySelector
                    register = {register}
                    errors = {errors}
                    targetSubcategories = {targetSubcategories}
                />
                <input type="submit" value="アップロード"></input>
                <div className="text-danger">{isSubmitted && <span>入力エラーがあります。</span>}</div>
            </form>
        </div>
    );
}

if (document.getElementById('make-question-page')) {
    ReactDOM.render(<MakeQuestionPage />,document.getElementById('make-question-page'));
}
