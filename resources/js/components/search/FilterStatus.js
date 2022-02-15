import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function FilterStatus(props) {
    const statusCheck = (event) =>{
        const status_id = event.target.value;
        if(event.target.checked){
            let newStatus = props.statuses.find(item => item.status_id == status_id);
            props.setCheckedStatusIds(
                [...props.checkedStatusIds.concat(newStatus.status_id).sort((a,b)=>a - b)]
            );
        }else{
            props.setCheckedStatusIds(
                [...props.checkedStatusIds.filter((item) => item != status_id)]
            );
        }
    }
    return (
        <form>
        <div className="col">
        {props.statuses.map(item =>
            <div className="row" key={item.status_id}>
                <input 
                    id={"status" + item.status_id}
                    type="checkbox"
                    name={"status"}
                    value={item.status_id}
                    checked={props.checkedStatusIds.includes(item.status_id)}
                    onChange={statusCheck}
                />
                <label className="h5" htmlFor={"status" + item.status_id}>{item.status_name}</label>
            </div>
        )}
        </div>
        </form>
    );
}

export default FilterStatus;