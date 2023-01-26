import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
//import ChoiceEditor from './ChoiceEditor';

function ChoicesCheckbox(props) {
    const correctChoiceCountRegister = props.register("correct_choice_count", {})
    const [ fullChoices, setFullChoices] = useState(false);
    const addClick = () =>{
        const symbols = "ABCDEFGHIJ";
        const choicesCnt = Object.keys(props.choices).length
        if(choicesCnt < symbols.length){
            let tmpChoices = { ...props.choices }
            tmpChoices[symbols[choicesCnt]] = false;
            props.setChoices(tmpChoices);
            props.setValue("choices", tmpChoices, {shouldValidate:false}); //バリデーション、画面の再描画されない。
            props.clearErrors("choices"); //バリデーションエラークリア、画面の再描画される。
        }
    }
    const deleteClick = () =>{
        const symbols = "ABCDEFGHIJ";
        const choicesCnt = Object.keys(props.choices).length
        if(choicesCnt >= 2){
            let tmpChoices = { ...props.choices }
            delete tmpChoices[symbols[choicesCnt-1]]
            props.setChoices(tmpChoices);
            props.setValue("choices", tmpChoices, {shouldValidate:false}); //バリデーション、画面の再描画されない。
            props.clearErrors("choices"); //バリデーションエラークリア、画面の再描画される。
        }
    }
    const changeChoices = (event) => {
        const symbol = event.target.value;
        let tmpChoices = { ...props.choices }
        tmpChoices[symbol] = !props.choices[symbol];
        props.setChoices(tmpChoices);
        props.setValue("choices." + symbol, !props.choices[symbol]);
        const correctChoiceCount = Object.keys(tmpChoices).filter((key)=>tmpChoices[key]).length;
        props.setValue("correct_choice_count", correctChoiceCount)
    }
    return (
        <div className="row border">
            <div className="col border">
                <div className="row border">
                    <div className="col">
                        <button 
                            type="button"
                            className="btn btn-primary btn-block"
                            onClick={addClick}
                            disabled={fullChoices}
                            tabIndex="-1">
                            選択肢を増やす
                        </button>
                    </div>
                    <div className="col">
                        <button
                            type="button"
                            className="btn btn-danger btn-block"
                            onClick={() => {
                                deleteClick();
                            }}
                            tabIndex="-1"
                        >
                            選択肢を減らす
                        </button>
                    </div>
                </div>
                <div className="row border">
                {Object.keys(props.choices).map((key) =>
                    <label key={key} className="h1 col border">
                        <div className="text-center">
                            <input type="checkbox"
                                name="choices"
                                value={key}
                                onChange={changeChoices}
                                checked={props.choices[key]}
                            />
                            {key}
                        </div>
                    </label>
                )}
                </div>
                <input 
                    type="hidden" 
                    readOnly="readonly" 
                    value={props.getValues("correct_choice_count")}
                    {...correctChoiceCountRegister}
                />
                {props.errors.correct_choice_count && <span className="text-danger">{props.errors.correct_choice_count.message}</span>}
            </div>
        </div>
    );
}

export default ChoicesCheckbox;