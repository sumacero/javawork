import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ImageUploader from '../makeQuestion/ImageUploader';
import ImagesEditor from '../makeQuestion/ImagesEditor';
import ChoicesCheckbox from '../makeQuestion/ChoicesCheckbox';
import WorkbookSelector from '../makeQuestion/WorkbookSelector';
import CategorySelector from '../makeQuestion/CategorySelector';
import DeleteQuestionModal from './DeleteQuestionModal';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { CSSTransition } from 'react-transition-group';

function EditQuestionPage(){
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
    const [ questionId, setQuestionId ] = useState(parseInt($('#tmp').data('question_id'))); 
    const [ question, setQuestion] = useState("");
    const [ choices, setChoices] = useState("");
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
    const [ correctChoiceIds, setCorrectChoiceIds] =useState([]);
    const [ openDeleteQuestionModal, setOpenDeleteQuestionModal] = useState(false);
    const [ isLoading, setIsLoading] = useState(true);
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
        }else if(questionImages.length > 5) {
            isError = true;
            setQuestionImagesError("問題文の画像が5枚を超えています");
        }else{
            setQuestionImagesError("");
        }
        if(answerImages.length === 0){
            isError = true;
            setAnswerImagesError("解答文の画像を選択してください");
        }else if(answerImages.length > 5) {
            isError = true;
            setAnswerImagesError("解答文の画像が5枚を超えています");
        }else{
            setAnswerImagesError("");
        }
        return isError;
    }
    /*
    const clickSaveButton = () => {
        let data = getValues();
        data.question_id = questionId;
        //送信データに画像情報を追加
        data.question_images = questionImages;
        data.answer_images = answerImages;
        const func = async () => {
            try {
                let res = await axios.post("save-question", data);
                setQuestionId(res.data);
                setPopupMsg("編集データを保存しました");
                setPopupFlag(!popupFlag);
            } catch (error) {
                console.log(error.response.data);
                setPopupMsg("保存できませんでした。入力した値を確認してください。");
                setPopupFlag(!popupFlag);
            }
        };
        func();
    }
    */
    const clickDeleteButton = () => {
        setOpenDeleteQuestionModal(true);
    }
    const deleteQuestion = () => {
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
        if (imagesVaridate()) return;
        data.question_id = questionId; //送信データにquestion_idを追加(nullの場合は新規レコード追加)
        //送信データに画像情報を追加
        data.question_images = questionImages;
        data.answer_images = answerImages;
        console.log(data);
        const func = async () => {
            try {
                let res = await axios.post("edit-question", data);
                setPopupMsg("確認画面に移動します。");
                setPopupFlag(!popupFlag);
                moveConfirmPage(questionId);
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
    function moveConfirmPage(question_id){
        console.log("確認画面へ移動します");
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
            let result = await axios.get('get-categories');
            let data = result.data.dbData;
            let workbooks = JSON.parse(JSON.stringify(data.workbooks));
            setWorkbooks(workbooks);
            let categories = JSON.parse(JSON.stringify(data.categories));
            setCategories(categories);
            result = await axios.get('get-question/' + questionId);
            data = result.data;
            const question = JSON.parse(JSON.stringify(data.dbData));
            setQuestion(question);
            let questionImages=JSON.parse(JSON.stringify(data.questionImages));
            let tmpQuestionImages = [];
            questionImages.forEach(function(questionImage, key) {
                let obj = {
                    "index":key,
                    "fileName":questionImage.fileName,
                    "dataUrl":questionImage.image
                }
                tmpQuestionImages.push(obj);
            });
            setQuestionImages(tmpQuestionImages);
            let answerImages=JSON.parse(JSON.stringify(data.answerImages));
            let tmpAnswerImages = [];
            answerImages.forEach(function(answerImage, key) {
                let obj = {
                    "index":key,
                    "fileName":answerImage.fileName,
                    "dataUrl":answerImage.image
                }
                tmpAnswerImages.push(obj);
            });
            setAnswerImages(tmpAnswerImages);
            // formの値を現在値に設定
            setValue("question_number", question.question_number);
            let choices = question.choices;
            let tmpChoices = {};
            choices.forEach(function(choice, key){
                tmpChoices[choice.choice_symbol] = choice.is_correct == "1";
            });
            setChoices(tmpChoices);
            setValue("choices", tmpChoices);
            console.log(choices);
            const correctChoiceCount = choices.filter((choice)=>choice.is_correct==1).length;
            setValue("correct_choice_count", correctChoiceCount);
            setValue("question_number", question.question_number);
            const category = categories.find((category)=>category.category_id==question.category_id);
            setValue("workbook_id", category.workbook_id);
            const targetCategories = categories.filter(obj => obj.workbook_id == category.workbook_id);
            setTargetCategories(targetCategories);
            setValue("category_id", category.category_id);
        };
        getData();
        setIsLoading(false);
    },[]);
    return (
        <div className="container border">
            <div className="row border">
                <div className="col border">
                    <p className="text-right">question_id:{questionId}</p>
                </div>
            </div>
            <div className="row border">
                {!isLoading &&
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
                            <button 
                                type="button" 
                                onClick={clickDeleteButton} 
                                className="btn btn-outline-secondary"
                                tabIndex="-1">
                                問題の削除
                            </button>
                        </div>
                    </form>
                </div>
                }
            </div>
            {openDeleteQuestionModal &&
                <DeleteQuestionModal
                    setOpenDeleteQuestionModal={setOpenDeleteQuestionModal}
                    deleteQuestion={deleteQuestion}
                />
            }
            <CSSTransition in={popupFlag} classNames="popup" timeout={5000}>
                <div>{popupMsg}</div>
            </CSSTransition>
        </div>
    );
}

if (document.getElementById('edit-question-page')) {
    ReactDOM.render(<EditQuestionPage />,document.getElementById('edit-question-page'));
}
