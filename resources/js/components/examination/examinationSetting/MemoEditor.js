import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function MemoEditor(props) {
    const onChanged =(e)=>{
        const setValue = e.target.value;
        props.setFormValues(state => ({
            ...state,
            "memo":setValue
        }));
    }
    return (
        <div>
            <div className="row">
                <div className="col">
                    メモ [2000字以内]
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextareaAutosize
                        minRows={6}
                        className={`${props.errors.memo ? 'invalid' : 'valid'}`}
                        style={{width:"100%", display:"block"}}
                        onChange={onChanged}
                        value={props.formValues.memo}
                    />
                    {props.errors.memo && <span className="text-danger">{props.errors.memo}</span>}
                </div>
            </div>
        </div>
    );
}

export default MemoEditor;