import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function FilterStatus(props) {
    const statusCheck = (event) =>{
        const status_id = event.target.value;
        if(event.target.checked){
            props.setCheckedStatuses(
                [...props.checkedStatuses.concat(props.statuses.find(item => item.status_id == status_id)).sort((a,b)=>a.status_id - b.status_id)]
            );
        }else{
            props.setCheckedStatuses(
                [...props.checkedStatuses.filter((item) => item.status_id != status_id)]
            );
        }
    }
    return (
        <form>
        {props.statuses.map(item =>
            <div key={item.status_id}>
                <input 
                    id={"status" + item.status_id}
                    type="checkbox"
                    name={"status"}
                    value={item.status_id}
                    checked={props.checkedStatuses.includes(item)}
                    onChange={statusCheck}
                />
                <label className="h5" htmlFor={"status" + item.status_id}>{item.status_name}</label>
            </div>
        )}
        </form>
    );
}

export default FilterStatus;