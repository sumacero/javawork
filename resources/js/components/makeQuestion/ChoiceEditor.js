import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import TextareaAutosize from 'react-textarea-autosize';

function ChoiceEditor(props) {
    const resisterString = "choiceText." + props.choiceSymbol
    const choiceTextRegister = props.register(resisterString, {
        required: "入力してください",
        maxLength: {value:1000, message:'1000文字以内で入力してください'}
    })
    const deleteClick = (event) =>{
        const symbol = "ABCDEFGH";
        const beforeChoiceTextsObj = props.getValues("choiceText");
        if(Object.keys(beforeChoiceTextsObj).length == 2) return;
        const correctChoiceSymbol = props.getValues("correctChoiceSymbol");
        const diffAscii = correctChoiceSymbol.charCodeAt(0) - props.choiceSymbol.charCodeAt(0)
        if(diffAscii > 0){
            const newCorrectChoiceSymbol = String.fromCharCode(correctChoiceSymbol.charCodeAt(0) - 1);
            props.setValue("correctChoiceSymbol", newCorrectChoiceSymbol, {shouldValidate:false});
        }else if(diffAscii == 0){
            props.setValue("correctChoiceSymbol", "", {shouldValidate:false});
        }
        let afterChoiceTextsObj = {};
        const afterChoiceTextArray = []
        let deleted = false;
        for(let i = 0; i<Object.keys(beforeChoiceTextsObj).length; i++){
            if(Object.keys(beforeChoiceTextsObj)[i] == props.choiceSymbol){
                deleted = true;
            }
            if(deleted){
                if(i + 1 < Object.keys(beforeChoiceTextsObj).length){
                    afterChoiceTextArray[i] = beforeChoiceTextsObj[symbol[i+1]];
                }
            }else{
                afterChoiceTextArray[i] = beforeChoiceTextsObj[symbol[i]];
            }
        };
        for(let i = 0; i<afterChoiceTextArray.length; i++){
            afterChoiceTextsObj[Object.keys(beforeChoiceTextsObj)[i]] = afterChoiceTextArray[i]
        };
        props.setValue("choiceText", afterChoiceTextsObj, {shouldValidate:false}); //バリデーションも画面の再描画もされない。
        props.clearErrors("choiceText"); //バリデーションエラークリア、画面の再描画される。
    }
    const invalid = (errors) => {
        return typeof(props.errors.choiceText) !== 'undefined' && props.choiceSymbol in props.errors.choiceText;
    }
    const correctAnswerClick = (event) =>{
        props.setValue("correctChoiceSymbol", props.choiceSymbol, {shouldValidate:false});
        props.clearErrors("correctChoiceSymbol"); //バリデーションエラークリア、画面の再描画される。
    }
    return (
        <div className="row mb-1">
            <button 
                type="button"
                className={`col-1 ${props.choiceSymbol == props.getValues("correctChoiceSymbol") ? 'btn btn-danger':'btn btn-primary'} `} 
                onClick={correctAnswerClick} 
            >
                {props.choiceSymbol}
            </button>
            <TextareaAutosize
                className={`col ${invalid() ? 'invalid' : 'valid'}`}
                {...choiceTextRegister}
            />
            <button
                type="button"
                className="col-1"
                onClick={(event) => {
                    deleteClick(event);
                }}
            >
                削除
            </button>
            {invalid() && <span className="text-danger">{props.errors.choiceText[props.choiceSymbol].message}</span>}
        </div>
    );
}

export default ChoiceEditor;