import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ImageUploader from './ImageUploader';
import ImagesEditor from './ImagesEditor';
import ChoicesCheckbox from './ChoicesCheckbox';
import WorkbookSelector from './WorkbookSelector';
import CategorySelector from './CategorySelector';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CSSTransition } from 'react-transition-group';

function MakeQuestionPage(){
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const defaultValues = {
        "question_number":"1",
        "choices":{
            "A":false,
            "B":false ,
            "C":false,
            "D":false,
        },
        "correct_choice_count":"0",
        "workbook_id":"",
        "category_id":"",
    };
    const [ questionId, setQuestionId ] = useState(null); 
    const [ choices, setChoices] = useState(defaultValues.choices);
    const [ workbooks, setWorkbooks ] = useState([]);
    const [ categories, setCategories] = useState([]);
    const [ targetCategories, setTargetCategories] = useState([]);
    const [ popupFlag, setPopupFlag] = useState(false);
    const [ popupMsg, setPopupMsg] = useState("");
    const [ questionImages, setQuestionImages ] = useState([]);
    const [ answerImages, setAnswerImages ] = useState([]);
    const [ questionImagesError, setQuestionImagesError] = useState("");
    const [ answerImagesError, setAnswerImagesError] = useState("");
    const [ holdImageType, setHoldImageType] =useState("");
    const [ laravelVaridateErrors, setLaravelVaridateErrors] = useState(null);
    //バリデーションルール
    const schema = yup.object().shape({
        question_number: yup.number()
            .min(1, '1から100までの整数を入力してください')
            .max(100, '1から100までの整数を入力してください'),
        correct_choice_count: yup.number().min(1, '正解の選択肢を選んでください'),
        workbook_id: yup.string()
            .required('選択してください'),
        category_id: yup.string()
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

    const imagesVaridate = ()=>{
        let isError = false;
        if(questionImages.length === 0){
            isError = true;
            setQuestionImagesError("問題文の画像を選択してください");
        }else if(questionImages.length > 8) {
            isError = true;
            setQuestionImagesError("問題文の画像が8枚を超えています");
        }else{
            setQuestionImagesError("");
        }
        if(answerImages.length === 0){
            isError = true;
            setAnswerImagesError("解答文の画像を選択してください");
        }else if(answerImages.length > 8) {
            isError = true;
            setAnswerImagesError("解答文の画像が8枚を超えています");
        }else{
            setAnswerImagesError("");
        }
        return isError;
    }

    const onSubmit = (data) => {
        if (imagesVaridate()) return;
        data.question_id = questionId; //送信データにquestion_idを追加(nullの場合は新規レコード追加)
        //送信データに画像情報を追加
        data.question_images = questionImages;
        data.answer_images = answerImages;
        //console.log(data);
        const func = async () => {
            try {
                let res = await axios.post("upload-question", data);
                console.log(res);
                let question_id = res.data;
                moveConfirmPage(question_id);
            } catch (error) {
                console.log(error.response.data);
                if(error.response.status == 422){
                    setLaravelVaridateErrors(JSON.parse(JSON.stringify(error.response.data.errors)));
                    setPopupMsg("バリデーションエラー：既にその問題番号は登録済みです。");
                    setPopupFlag(!popupFlag);
                }else{
                    console.log(error.response.data);
                    setPopupMsg("サーバーエラー：問題作成に失敗しました。");
                    setPopupFlag(!popupFlag);
                }
            }
        };
        func();
    }

    //登録した問題の主キーをPOSTし確認画面へ移動する
    function moveConfirmPage(questionId){
        let form = document.createElement('form');   
        form.method = 'post';
        form.action = 'confirm-question';
        form.innerHTML = '<input type="hidden" name="_token" value=' + csrf_token + '>'
            + '<input type="hidden" name="question_id" value=' + questionId + '>';
        document.body.append(form);
        form.submit();
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('get-categories');
            const data = result.data.dbData;
            setWorkbooks(JSON.parse(JSON.stringify(data.workbooks)));
            setCategories(JSON.parse(JSON.stringify(data.categories)));
        };
        fetchData();
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
                            <div className="col border">
                                <WorkbookSelector
                                    register = {register}
                                    errors = {errors}
                                    workbooks = {workbooks}
                                    setWorkbooks = {setWorkbooks}
                                    categories = {categories}
                                    setTargetCategories = {setTargetCategories}
                                />
                            </div>
                            <div className="col border">
                                <div className="row border">
                                    <div className="col border">
                                        <CategorySelector
                                            register = {register}
                                            errors = {errors}
                                            targetCategories = {targetCategories}
                                        />
                                    </div>
                                    <div className="col border">
                                        <label>問題番号<br/>
                                            <input
                                                type="number"
                                                step="1"
                                                min="1"
                                                max="100"
                                                {...register("question_number", {})}>
                                            </input>
                                        </label>
                                        {errors.question_number &&  
                                            <span className="text-danger">{errors.question_number.message}</span>
                                        }
                                    </div>
                                </div>
                                {laravelVaridateErrors && laravelVaridateErrors.question_number &&
                                    <p className="text-danger text-center">
                                        {laravelVaridateErrors.question_number[0]}
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col border">
                                <ImageUploader
                                    setImages = {setQuestionImages}
                                    images = {questionImages}
                                    error = {questionImagesError}
                                />
                                <ImagesEditor
                                    setImages = {setQuestionImages}
                                    images = {questionImages}
                                    imageType = {"question"}
                                    setHoldImageType = {setHoldImageType}
                                    holdImageType = {holdImageType}
                                />
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col border">
                                <ChoicesCheckbox
                                    setChoices = {setChoices}
                                    choices = {choices}
                                    setValue = {setValue}
                                    getValues = {getValues}
                                    register = {register}
                                    errors = {errors}
                                    clearErrors = {clearErrors}
                                />
                            </div>
                        </div>
                        <div className="row border">
                            <div className="col border">
                                <ImageUploader
                                    setImages = {setAnswerImages}
                                    images = {answerImages}
                                    error = {answerImagesError}
                                />
                                <ImagesEditor
                                    setImages = {setAnswerImages}
                                    images = {answerImages}
                                    imageType = {"answer"}
                                    setHoldImageType = {setHoldImageType}
                                    holdImageType = {holdImageType}
                                />
                            </div>
                        </div>
                        <div className="row border">
                            <input 
                                type="submit"
                                className="btn btn-outline-dark"
                                value="確認画面へ"
                                tabIndex="-1">
                            </input>
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

if (document.getElementById('make-question-page')) {
    ReactDOM.render(<MakeQuestionPage />,document.getElementById('make-question-page'));
}
