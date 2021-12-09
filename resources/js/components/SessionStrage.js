import React, {useState} from 'react'

function useSessionStrage(ky, initVal){
    const key = "hooks:" + ky;
    const value = () => {
        try{
            const item = window.sessionStorage.getItem(ky);
            return item ? JSON.parse(item) : initVal;
        }
        catch(error){
            console.log(error);
            return initVal;
        }
    }
    const setValue = (val) => {
        try{
            setSavedValue(val);
            window.sessionStorage.setItem(ky, JSON.stringify(val));
        }
        catch(error){
            console.log(error);
        }
    }
    const [savedValue, setSavedValue] = useState(value);
    return [savedValue, setValue];
}

export default useSessionStrage;