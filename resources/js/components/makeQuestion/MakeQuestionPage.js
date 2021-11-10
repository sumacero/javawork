import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import QuestionEditor from './QuestionEditor';
import ChoicesEditor from './ChoicesEditor';
import ExplanationEditor from './ExplanationEditor';
import CategorySelector from './CategorySelector';
import SubcategorySelector from './SubcategorySelector';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function MakeQuestionPage(){
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const defaultValues = {
        "question_text":"",
        "choice_text":{
            "A":"",
            "B":"",
            "C":"",
            "D":"",
        },
        "answer_text":"",
        "category_id":"",
        "subcategory_id":"",
        "correct_choice_symbol":"",
    };
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    const [ targetSubcategories, setTargetSubcategories] = useState([]);
    function validateChoiceText1(choice_text){
        //フォームが存在し、かつ値が空文字の場合はエラー
        return !(typeof choice_text !== "undefined" && choice_text == "");
    }
    function validateChoiceText2(choice_text) {
        //他のフォーム値と重複がある場合はエラー
        const choices_text_obj = this.parent;
        let dupCount = 0;
        const symbol = "ABCDEFGH";
        for (let i = 0; i < Object.keys(choices_text_obj).length; i++) {
            if (choices_text_obj[symbol[i]] === choice_text) {
                dupCount++;
                if (dupCount > 1) {
                    return false;
                }
            }
        }
        return true;
    }
    //バリデーションルール
    const schema = yup.object().shape({
        question_text: yup.string()
            .required('入力してください')
            .max(3000, '3000文字以内で入力してください'),
        choice_text: yup.object({
            A:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
            B:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
            C:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
            D:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
            E:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
            F:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
            G:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
            H:yup.string()
                .test('existAndRequired', '入力してください', validateChoiceText1)
                .test('checkDuplicated', '他の選択肢と重複しています', validateChoiceText2),
        }),
        correct_choice_symbol: yup.string()
            .required('正解の選択肢を選んでください(アルファベットをクリック)'),
        answer_text: yup.string()
            .required('入力してください')
            .max(3000, '3000文字以内で入力してください'),
        category_id: yup.string()
            .required('選択してください'),
        subcategory_id: yup.string()
            .required('選択してください'),
    })

    const { register, setValue, getValues, handleSubmit, formState: { errors, isSubmitted}, clearErrors} = useForm({
        mode: 'onBlur', //カーソルを外したタイミングでチェック
        reValidateMode: 'onChange',
        criteriaMode: "all",
        shouldFocusError: false, // エラーフォームのフォーカスを無効にする
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });

    const onSubmit = (data) => {
        console.log("以下のデータを登録します。")
        console.log(data);
        const func = async () => {
            try {
                let res = await axios.post("upload-question", data);
                let inserted_question_id = res.data;
                alert("問題の編集データをアップロードしました。");
                moveConfirmPage(inserted_question_id);
            } catch (error) {
                console.log(error.response.data);
                alert("サーバーエラーが発生しました。");
            }
        };
        func();
    }
    //登録した問題の主キーをPOSTし確認画面へ移動する
    function moveConfirmPage(inserted_question_id){
        let form = document.createElement('form');   
        form.method = 'post';
        form.action = '../confirm-question';
        form.innerHTML = '<input type="hidden" name="_token" value=' + csrf_token + '>'
            + '<input type="hidden" name="question_id" value=' + inserted_question_id + '>';
        document.body.append(form);
        form.submit();
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
            <form name="myform" onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" name="_token" value={csrf_token} />
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
                <input type="submit" value="確認画面へ"></input>
                <input type="submit" value="編集データの保存"></input>
            </form>
        </div>
    );
}

if (document.getElementById('make-question-page')) {
    ReactDOM.render(<MakeQuestionPage />,document.getElementById('make-question-page'));
}
