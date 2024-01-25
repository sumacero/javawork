import React, { useEffect, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

function TitleEditor(props) {
    const onChanged =(e)=>{
        const setValue = e.target.value;
        props.setFormValues(state => ({
            ...state,
            "title":setValue
        }));
    }
    return (
        <div>
            <div className="row">
                <div className="col">
                    タイトル [100字以内]
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <TextareaAutosize
                        minRows={1}
                        className={`${props.errors.title ? 'invalid' : 'valid'}`}
                        style={{width:"100%", display:"block"}}
                        onChange={onChanged}
                        value={props.formValues.title}
                    />
                    {props.errors.title && <span className="text-danger">{props.errors.title}</span>}
                </div>
            </div>
        </div>
    );
}

export default TitleEditor;