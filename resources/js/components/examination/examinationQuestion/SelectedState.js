import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

function SelectedState(props) {
    return (
        <div className="row">
            <div className="col">
                現在の回答：{ props.selectedChoiceSymbols.length>0 ?
                    props.selectedChoiceSymbols.join()
                    :
                    "未回答"
                }
            </div>
        </div>
    );
}

export default SelectedState;