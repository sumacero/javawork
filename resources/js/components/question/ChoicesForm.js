import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function ChoicesForm(props) {
    const changeChoices = (event) => {
        const chengedValue = parseInt(event.target.value);
        if (props.selectedChoiceIds.includes(chengedValue)) {
            // 選択済みの場合、対象要素を取り除く
            props.setSelectedChoiceIds(props.selectedChoiceIds.filter(item => item !== chengedValue));
        } else {
            // 未選択の場合、対象要素を追加する
             props.setSelectedChoiceIds([...props.selectedChoiceIds, chengedValue]);
        }
    }
    return (
        <form>
        <div className="row">
        {props.choices.map((choice) =>
                <label key={choice.choice_id} className="col border">
                    <input type="checkbox"
                        value={choice.choice_id}
                        onChange={changeChoices}
                        checked={props.selectedChoiceIds.includes(choice.choice_id)}
                        disabled={props.answeredFlag}
                    />
                        {choice.choice_symbol}
                </label>
        )}
        </div>
        </form>
    );
}

export default ChoicesForm;