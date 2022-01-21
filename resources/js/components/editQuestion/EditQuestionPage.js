import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import QuestionEditor from '../makeQuestion/QuestionEditor';
import ChoicesEditor from '../makeQuestion/ChoicesEditor';
import ExplanationEditor from '../makeQuestion/ExplanationEditor';
import CategorySelector from '../makeQuestion/CategorySelector';
import SubcategorySelector from '../makeQuestion/SubcategorySelector';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CSSTransition } from 'react-transition-group';

function EditQuestionPage(){
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
    const [ questionId, setQuestionId ] = useState(parseInt($('#tmp').data('question_id'))); 
    const [ loadingData, setLoadingData] = useState(true);
    const [ categories, setCategories] = useState([]);
    const [ subcategories, setSubcategories] = useState([]);
    const [ targetSubcategories, setTargetSubcategories] = useState([]);
    const [ popupFlag, setPopupFlag] = useState(false);
    const [ popupMsg, setPopupMsg] = useState("");
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

    const clickSaveButton = () => {
        let data = getValues();
        data.question_id = questionId;
        const func = async () => {
            try {
                let res = await axios.post("save-question", data);
                setQuestionId(res.data);
                setPopupMsg("編集データを保存しました");
                setPopupFlag(!popupFlag);
            } catch (error) {
                console.log(error.response.data);
                alert("サーバーエラーが発生しました。");
            }
        };
        func();
    }

    const clickDeleteButton = () => {
        let data = getValues();
        data.question_id = questionId;
        const func = async () => {
            try {
                let res = await axios.post("delete-question", data);
                alert("問題を削除しました。");
                window.location.href = 'search';
            } catch (error) {
                alert("サーバーエラーが発生しました。");
            }
        };
        func();
    }

    const onSubmit = (data) => {
        data.question_id = questionId; //送信データにquestion_idを追加
        const func = async () => {
            try {
                let res = await axios.post("edit-question", data);
                moveConfirmPage(questionId);
            } catch (error) {
                console.log(error.response.data);
                alert("サーバーエラーが発生しました。");
            }
        };
        func();
    }
    //登録した問題の主キーをPOSTし確認画面へ移動する
    function moveConfirmPage(question_id){
        let form = document.createElement('form');   
        form.method = 'post';
        form.action = 'confirm-question';
        form.innerHTML = '<input type="hidden" name="_token" value=' + csrf_token + '>'
            + '<input type="hidden" name="question_id" value=' + question_id + '>';
        document.body.append(form);
        form.submit();
    }

    useEffect(() => {
        const getData = async () => {
            const result1 = await axios.get('get-categories');
            const data1 = result1.data.dbData;
            setCategories(JSON.parse(JSON.stringify(data1.categories)));
            setSubcategories(JSON.parse(JSON.stringify(data1.subcategories)));
            const result2 = await axios.get('get-qa/' + questionId);
            const data2 = result2.data.dbData;
            const question = JSON.parse(JSON.stringify(data2.question));
            const choices = JSON.parse(JSON.stringify(data2.choices));
            const answer = JSON.parse(JSON.stringify(data2.answer))
            const subcategories = JSON.parse(JSON.stringify(data1.subcategories));
            const subcategory = subcategories.find(
                (subcategory) => subcategory.subcategory_id === question.subcategory_id
            );
            const targetSubcategories = subcategories.
                filter(subcategory => subcategory.category_id == subcategory.category_id);
            const correctChoice = choices.find(
                (choice) => choice.choice_id === answer.choice_id
            );
            setTargetSubcategories(targetSubcategories);
            setValue("question_text", question.question_text);
            for(let i = 0; i<choices.length; i++){
                setValue("choice_text." + choices[i].choice_symbol, choices[i].choice_text);
            }
            correctChoice && setValue("correct_choice_symbol", correctChoice.choice_symbol);
            setValue("answer_text", answer.answer_text);
            subcategory && setValue("category_id", subcategory.category_id);
            subcategory && setValue("subcategory_id", subcategory.subcategory_id);
            setLoadingData(false);
        };
        getData();
    },[]);
    return (
        <div className="container border">
            <div className="row border">
                <div className="col border">
                    <p className="text-right">question_id:{questionId}</p>
                </div>
            </div>
            <div className="row border">
                <div className="col border">
                    <form name="myform" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="_token" value={csrf_token} />
                        <div className="row border">
                            <div className="col border p-0">
                                <QuestionEditor
                                    register = {register}
                                    errors = {errors}
                                />
                            </div>
                        </div>
                        {!loadingData &&
                            <div className="row border">
                                <div className="col border">
                                <ChoicesEditor
                                    setValue = {setValue}
                                    getValues = {getValues}
                                    register = {register}
                                    errors = {errors}
                                    clearErrors = {clearErrors}
                                />
                                </div>
                            </div>
                        }
                        <div className="row border">
                            <div className="col border p-0">
                                <ExplanationEditor
                                    register = {register}
                                    errors = {errors}
                                />
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col border">
                                <CategorySelector
                                    register = {register}
                                    errors = {errors}
                                    categories = {categories}
                                    setCategories = {setCategories}
                                    subcategories = {subcategories}
                                    setTargetSubcategories = {setTargetSubcategories}
                                />
                            </div>
                            <div className="col border">
                                <SubcategorySelector
                                    register = {register}
                                    errors = {errors}
                                    targetSubcategories = {targetSubcategories}
                                />
                            </div>
                        </div>
                        <div className="row border">
                            <input type="submit" className="btn btn-outline-dark" value="確認画面へ"></input>
                            <button type="button" onClick={clickSaveButton} className="btn btn-outline-dark">編集データの保存</button>
                            <button type="button" onClick={clickDeleteButton} className="btn btn-outline-secondary">問題の削除</button>
                        </div>
                    </form>
                </div>
            </div>
            <CSSTransition in={popupFlag} classNames="popup" timeout={1000}>
                <div>{popupMsg}</div>
            </CSSTransition>
        </div>
    );
}

if (document.getElementById('edit-question-page')) {
    ReactDOM.render(<EditQuestionPage />,document.getElementById('edit-question-page'));
}
