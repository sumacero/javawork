import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ChoiceEditor from './ChoiceEditor';

function ChoicesEditor(props) {
    const correctChoiceSymbolRegister = props.register("correctChoiceSymbol", {
        required: "正解の選択肢を選んでください(アルファベットをクリック)"
    })
    const [ fullChoices, setFullChoices] = useState(false);
    const choicesObj = props.getValues("choiceText");
    const addClick = (event) =>{
        const symbol = "ABCDEFGH";
        const beforeChoiceTextsObj = props.getValues("choiceText");
        let beforeChoicesCnt = Object.keys(beforeChoiceTextsObj).length
        if(beforeChoicesCnt < symbol.length){
            let afterChoiceTextsObj = { ...beforeChoiceTextsObj }
            afterChoiceTextsObj[symbol[beforeChoicesCnt]] = "";
            props.setValue("choiceText", afterChoiceTextsObj, {shouldValidate:false}); //バリデーション、画面の再描画されない。
            props.clearErrors("choiceText"); //バリデーションエラークリア、画面の再描画される。
        }
    }
    return (
        <div className="form-group">
            <button type="button" onClick={addClick} disabled={fullChoices}>
                選択肢を追加
            </button>
            {Object.keys(choicesObj).map((choice_symbol) => 
                <ChoiceEditor
                    key={choice_symbol}
                    choiceSymbol={choice_symbol}
                    choiceText={choicesObj[choice_symbol]}
                    setValue={props.setValue}
                    getValues={props.getValues}
                    register={props.register}
                    errors={props.errors}
                    clearErrors = {props.clearErrors}
                />
            )}
            <input 
                type="hidden" 
                readOnly="readonly" 
                value={props.getValues("correctChoiceSymbol")} 
                {...correctChoiceSymbolRegister}
            />
            {props.errors.correctChoiceSymbol && <span className="text-danger">{props.errors.correctChoiceSymbol.message}</span>}
        </div>
    );
}

export default ChoicesEditor;