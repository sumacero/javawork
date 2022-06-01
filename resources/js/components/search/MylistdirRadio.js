import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function MylistdirRadio(props) {
    const mylistdirCheck = (event) =>{
        const mylistdirId = event.target.value;
        if(event.target.checked){
            props.setSelectedMylistdirId(mylistdirId);
        }
    }
    const existed = (mylists) => {
        return mylists.some(mylist => mylist.question_id == props.questionId);
    }
    return (
        <form>
        <div className="col">
        {props.mylistdirs.map(item =>
            <div className="row" key={item.mylistdir_id}>
                <input 
                    id={"mylistdir_id" + item.mylistdir_id}
                    type="radio"
                    name={"mylistdir"}
                    value={item.mylistdir_id}
                    onChange={mylistdirCheck}
                    disabled={existed(item.mylists)}
                />
                {existed(item.mylists) ?
                    <label className="h5" htmlFor={"mylistdir_id" + item.mylistdir_id}>
                    {item.mylistdir_name + " *登録済み"}
                    </label>
                    :
                    <label className="h5" htmlFor={"mylistdir_id" + item.mylistdir_id}>
                    {item.mylistdir_name}
                    </label>
                }
            </div>
        )}
        </div>
        </form>
    );
}

export default MylistdirRadio;