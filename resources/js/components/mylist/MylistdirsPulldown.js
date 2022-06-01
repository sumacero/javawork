import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function MylistdirsPulldown(props){
    const selectBox = {
        width: "100%",
    };
    const doChangeMylistdir = (event) => {
        const mylistdirId = event.target.value;
        props.doChangeMylistdir(mylistdirId);
    }
    return(
        <div className="container border mb-2">
            <div className="row border">
                <div className="col border">
                    <select name="example" value={props.selectedMylistdir.mylistdir_id} onChange={doChangeMylistdir} style={selectBox}>
                    {
                        props.mylistdirs.map((mylistdir) => 
                            <option key={mylistdir.mylistdir_id} 
                                value={mylistdir.mylistdir_id} 
                            >
                                {mylistdir.mylistdir_name}
                            </option>
                        )
                    }
                    </select>
                </div>
            </div>
        </div>
    );
}

export default MylistdirsPulldown;                          