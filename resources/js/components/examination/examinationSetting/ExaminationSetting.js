import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CategoryCheckbox from '../../randomQuestionSetting/CategoryCheckbox';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import axios from 'axios';

function ExaminationSetting(props) {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const defaultValues = {
        "question_count": "1",
        "examination_time": "1",
        "category_ids": []
    };
    const [workbooks, setWorkbooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checkedCategories, setCheckedCategories] = useState([]);
    const [targetQuestionCount, setTargetQuestionCount] = useState(0);
    const [examinationQuestionIds, setExaminationQuestionIds] = useState([]);
    //バリデーションルール
    const schema = yup.object().shape({
        question_number: yup.number()
            .integer('問題数を1から100までの整数で入力してください')
            .min(1, '問題数を1から100までの整数で入力してください')
            .max(100, '問題数を1から100までの整数で入力してください')
            .test(
                'question_count',
                '入力した出題数に対して、登録済みの問題数が不足しています',
                originalVaridate2
            ),
        examination_time: yup.number()
            .integer('試験時間を1から300までの整数で入力してください')
            .min(1, '試験時間を1から300までの整数で入力してください')
            .max(300, '試験時間を1から300までの整数で入力してください'),
        category_ids: yup.array()
            .test(
                'category_ids',
                'カテゴリを選択してください',
                originalVaridate1
            ).test(
                'category_ids',
                '入力した出題数に対して、登録済みの問題数が不足しています',
                originalVaridate2
            ),
    });
    function originalVaridate1(category_ids) {
        const checkedLength = category_ids.length;
        return checkedLength > 0;
    }
    function originalVaridate2() {
        return getValues("question_count") <= targetQuestionCount;
    }
    const { register, setValue, getValues, handleSubmit, trigger, formState: { errors, isSubmitted }, clearErrors } = useForm({
        mode: 'onBlur', //値の変更時にバリデーション
        reValidateMode: 'onBlur',
        criteriaMode: "all",
        shouldFocusError: false, // エラーフォームのフォーカスを無効にする
        defaultValues: defaultValues,
        resolver: yupResolver(schema),
    });
    //出題設定データをPOSTしランダム出題画面へ移動する
    const onSubmit = (data) => {
        console.log("試験問題リストを取得");
        console.log(data);
        const fetchData = async () => {
            const res1 = await axios.post('get-examination-question-ids', data);
            let examinationQuestionIds = res1.data.examinationQuestionIds;
            console.log("問題IDリスト：" + examinationQuestionIds);
            setExaminationQuestionIds(JSON.parse(JSON.stringify(examinationQuestionIds)));
            const res2 = await axios.post('get-examination-data', examinationQuestionIds);
            console.log(res2.data);
            let questions = res2.data.questions;
            props.setQuestions(JSON.parse(JSON.stringify(questions)));
            props.setExeminationState("questionList");
            /*
            let form = document.createElement('form');
            form.method = 'post';
            form.action = 'examination-question-list';
            form.innerHTML = '<input type="hidden" name="_token" value=' + csrf_token + '>'
                + '<input type="hidden" name="question_ids" value=' + examinationQuestionIds + '>';
            document.body.append(form);
            form.submit();
            */
        };
        fetchData();
    }
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios.get('get-categories-with-question-count');
            const data = result.data.dbData;
            setWorkbooks(JSON.parse(JSON.stringify(data.workbooks)));
            setCategories(JSON.parse(JSON.stringify(data.categories)));
        };
        fetchData();
    }, []);
    return (
        <div>
            <div className="row">
                <h1>模擬試験設定</h1>
            </div>
            <p>選択されたカテゴリから均等にランダムで出題されます。</p>
            <p>問題数:{targetQuestionCount}</p>
            <form name="myform" onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="submit"
                    className="btn btn-success btn-block mb-3"
                    value="出題開始"
                    disabled={targetQuestionCount === 0}
                    tabIndex="-1"
                >
                </input>
                <div className="row border">
                    <div className="col border">
                        <label>出題数：
                            <input
                                type="number"
                                step="1"
                                {...register("question_count", {})}
                            >
                            </input>
                            問
                        </label>
                    </div>
                    <div className="col border">
                        <label>試験時間：
                            <input
                                type="number"
                                step="1"
                                {...register("examination_time", {})}
                            >
                            </input>
                            分
                        </label>
                    </div>
                </div>
                <div className="row">
                    {errors.question_count &&
                        <span className="text-danger">{errors.question_count.message}</span>
                    }
                </div>
                <div className="row">
                    {errors.examinarion_time &&
                        <span className="text-danger">{errors.examination_time.message}</span>
                    }
                </div>
                <div className="row border">
                    <CategoryCheckbox
                        register={register}
                        errors={errors}
                        trigger={trigger}
                        workbooks={workbooks}
                        categories={categories}
                        setValue={setValue}
                        getValues={getValues}
                        setTargetQuestionCount={setTargetQuestionCount}
                        targetQuestionCount={targetQuestionCount}
                    />
                </div>
                <input type="hidden" name="_token" value={csrf_token} />
            </form>
        </div>
    );
}

export default ExaminationSetting;
