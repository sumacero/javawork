import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import ChoiceEditor from './ChoiceEditor';

function ChoicesEditor(props) {
    const correctChoiceSymbolRegister = props.register("correct_choice_symbol", {})
    const [ fullChoices, setFullChoices] = useState(false);
    const choicesObj = props.getValues("choice_text");
    const addClick = (event) =>{
        const symbol = "ABCDEFGH";
        const beforeChoiceTextsObj = props.getValues("choice_text");
        let beforeChoicesCnt = Object.keys(beforeChoiceTextsObj).length
        if(beforeChoicesCnt < symbol.length){
            let afterChoiceTextsObj = { ...beforeChoiceTextsObj }
            afterChoiceTextsObj[symbol[beforeChoicesCnt]] = "";
            props.setValue("choice_text", afterChoiceTextsObj, {shouldValidate:false}); //バリデーション、画面の再描画されない。
            props.clearErrors("choice_text"); //バリデーションエラークリア、画面の再描画される。
        }
    }
    return (
        <div className="form-group">
            <button type="button" className="btn btn-primary" onClick={addClick} disabled={fullChoices}>
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
                value={props.getValues("correct_choice_symbol")} 
                {...correctChoiceSymbolRegister}
            />
            {props.errors.correct_choice_symbol && <span className="text-danger">{props.errors.correct_choice_symbol.message}</span>}
        </div>
    );
}

export default ChoicesEditor;