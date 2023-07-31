import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import CategoryCheckbox from './CategoryCheckbox';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

function RandomQuestionSettingPage(props) {
    const csrf_token = document.head.querySelector('meta[name="csrf-token"]').content;
    const [workbooks, setWorkbooks] = useState([]);
    const [categories, setCategories] = useState([]);
    const [targetQuestionCount, setTargetQuestionCount] = useState(0);
    const defaultValues = {
        "category_ids":[]
    };
    //バリデーションルール
    const schema = yup.object().shape({
        category_ids: yup.array()
        .test(
            'category_ids',
            'カテゴリを選択してください',
            originalVaridate1
        ).test(
            'category_ids',
            '問題が存在しません',
            originalVaridate2
        ),
    })
    function originalVaridate1(category_ids) {
        const checkedLength = category_ids.length;
        return checkedLength > 0;
    }
    function originalVaridate2() {
        return targetQuestionCount > 0;
    }
    const { register, setValue, getValues, handleSubmit, trigger, formState: { errors, isSubmitted }, clearErrors } = useForm({
        mode: 'onChange', //値の変更時にバリデーション
        reValidateMode: 'onChange',
        criteriaMode: "all",
        shouldFocusError: false, // エラーフォームのフォーカスを無効にする
        defaultValues: defaultValues,
        //resolver: yupResolver(schema),
    });
    const onSubmit = (data) => {
        let form = document.createElement('form');
        form.method = 'post';
        form.action = 'random-question';
        form.innerHTML = '<input type="hidden" name="_token" value=' + csrf_token + '>'
            + '<input type="hidden" name="category_ids" value=' + data.category_ids + '>';
        document.body.append(form);
        form.submit();
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
    useEffect(()=>{
        trigger(); // バリデーションの実行
    }, [targetQuestionCount]);
    return (
        <div className="container">
            <p>問題数:{targetQuestionCount}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="submit"
                    className="btn btn-success btn-block mb-3"
                    value="出題開始"
                    disabled={targetQuestionCount===0}
                    tabIndex="-1"
                >
                </input>
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
                <input type="hidden" name="_token" value={csrf_token} />
            </form>
        </div>
    );
}

if (document.getElementById('random-question-setting-page')) {
    ReactDOM.render(<RandomQuestionSettingPage />, document.getElementById('random-question-setting-page'));
}
