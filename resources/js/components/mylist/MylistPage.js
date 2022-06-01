import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import MylistdirsPulldown from './MylistdirsPulldown';
import Mylists from './Mylists';
import MakeMylistdirModal from './MakeMylistdirModal';
import ChangeMylistdirNameModal from './ChangeMylistdirNameModal';
import DeleteMylistdirModal from './DeleteMylistdirModal';
import { CSSTransition } from 'react-transition-group';
//import { EXITED } from 'react-transition-group/Transition';

function MylistPage() {
    const [mylistdirs, setMylistdirs] = useState("");
    const [mylists, setMylists] = useState("");
    const [paginationData, setPaginationData] = useState([]);
    const [selectedMylistdir, setSelectedMylistdir] = useState("");
    const [openMakeMylistdirModal, setOpenMakeMylistdirModal] = useState(false);
    const [openChangeMylistdirNameModal, setOpenChangeMylistdirNameModal] = useState(false);
    const [openDeleteMylistdirModal, setOpenDeleteMylistdirModal] = useState(false);
    const [popupFlag, setPopupFlag] = useState(false);
    const [popupMsg, setPopupMsg] = useState("");

    const getMylistDirs = async () => {
        console.log("getMylistDirs");
        const result = await axios.get('../get-mylistdirs/');
        const dbData = result.data.dbData;
        const mylistdirs = JSON.parse(JSON.stringify(dbData));
        if (mylistdirs.length>0){
            setMylistdirs(mylistdirs);
            const tmpMylistdir = dbData.find((mylistdir)=>mylistdir.mylistdir_id == selectedMylistdir.mylistdir_id);
            //マイリストフォルダが未選択または選択済みフォルダidがDBに存在しない場合は先頭要素を選択。
            if(selectedMylistdir == "" || !tmpMylistdir) {
                setSelectedMylistdir(mylistdirs[0]);
                getMylists(mylistdirs[0].mylistdir_id, 1);
            }
        }
    };
    useEffect(() => {
        getMylistDirs();
    },[]);

    const getMylists = async (mylistdirId, page) => {
        const result = await axios.get('../get-mylists/', {
            params:{
                "mylistdir_id":mylistdirId,
                "page":page
            }
        });
        const dbData = result.data.dbData;
        console.log(dbData);
        let paginationData = {
            "total": dbData.total,
            "per_page": dbData.per_page,
            "current_page": dbData.current_page,
            "last_page": dbData.last_page,
            "next_page_url": dbData.next_page_url,
            "prev_page_url": dbData.prev_page_url,
            "from": dbData.from,
            "to": dbData.to,
        };
        const mylists = JSON.parse(JSON.stringify(dbData.data));
        setMylists(mylists);
        setPaginationData(JSON.parse(JSON.stringify(paginationData)));
    };
    const movePage = (page)=>{
        getMylists(selectedMylistdir.mylistdir_id, page);
    }
    const doChangeMylistdir = (mylistdirId) => {
        const mylistdir = mylistdirs.find((mylistdir)=>mylistdir.mylistdir_id == mylistdirId);
        setSelectedMylistdir(mylistdir);
        getMylists(mylistdirId, 1);
    }
    const clickMakeMylistdirButton = ()=>{
        setOpenMakeMylistdirModal(true);
    }
    const clickChangeMylistdirNameButton = () => {
        setOpenChangeMylistdirNameModal(true);
    }
    const clickDeleteMylistdirButton = () => {
        setOpenDeleteMylistdirModal(true);
    }
    const deleteMylist = async(mylistId) => {
        const result = await axios.post('../delete-mylist/', {
            params:{
                "mylist_id":mylistId,
            }
        });
        setPopupMsg("マイリスト"+ "\"" + selectedMylistdir.mylistdir_name + "\"" + "から問題を削除しました");
        setPopupFlag(!popupFlag);
        getMylists(selectedMylistdir.mylistdir_id, paginationData.current_page);
    }
    const deleteMylistdir = async() => {
        try {
            const result = await axios.post('../delete-mylistdir/', {
                params:{
                    "mylistdir_id":selectedMylistdir.mylistdir_id,
                }
            });
            setPopupMsg("マイリストを削除しました");
            setPopupFlag(!popupFlag);
            getMylistDirs();
        } catch(error){
            console.log(error.response.data);
            setPopupMsg("DBエラー：マイリストを削除できませんでした。");
            setPopupFlag(!popupFlag);
        }
    }
    const makeMylistdir = async(mylistdirName)=>{
        try {
            const result = await axios.post('../make-mylistdir/', {
                params:{
                    "mylistdir_name":mylistdirName,
                }
            });
            const makedMylistdir = result.data;
            setPopupMsg("マイリスト”" + mylistdirName + "”を作成しました");
            setPopupFlag(!popupFlag);
            getMylistDirs();
            setSelectedMylistdir(makedMylistdir);
            getMylists(makedMylistdir.mylistdir_id, 1);
        } catch(error){
            console.log(error.response.data);
            setPopupMsg("DBエラー：マイリストの作成に失敗しました。");
            setPopupFlag(!popupFlag);
        }
    }
    const changeMylistdirName = async(mylistdirName) => {
        try {
            const result = await axios.post('../change-mylistdir-name/', {
                params:{
                    "mylistdir_id":selectedMylistdir.mylistdir_id,
                    "mylistdir_name":mylistdirName,
                }
            });
            setPopupMsg("マイリスト名を" + mylistdirName + "に変更しました");
            setPopupFlag(!popupFlag);
            getMylistDirs();
            let newSelectedMylistdir = selectedMylistdir;
            newSelectedMylistdir.mylistdir_name = mylistdirName;
            setSelectedMylistdir(newSelectedMylistdir);
            getMylists(selectedMylistdir.mylistdir_id, 1);
        } catch(error){
            console.log(error.response.data);
            setPopupMsg("保存できませんでした。入力した値を確認してください。");
            setPopupFlag(!popupFlag);
        }
    }
    return (
        <div className="container">
            {mylistdirs !== "" &&
                <div className="row border mb-2">
                    <div className="col border">
                        <MylistdirsPulldown
                            selectedMylistdir={selectedMylistdir}
                            mylistdirs={mylistdirs} 
                            doChangeMylistdir={doChangeMylistdir}
                        />
                        <Mylists
                            setPaginationData={setPaginationData}
                            paginationData={paginationData}
                            movePage={movePage}
                            mylists={mylists}
                            deleteMylist={deleteMylist}
                            clickChangeMylistdirNameButton={clickChangeMylistdirNameButton}
                            clickDeleteMylistdirButton={clickDeleteMylistdirButton}
                        />
                    </div>
                </div>
            }
            <button className="btn btn-primary btn-block" onClick={clickMakeMylistdirButton}>マイリストの作成</button>
            {openMakeMylistdirModal &&
                <MakeMylistdirModal
                    setOpenMakeMylistdirModal={setOpenMakeMylistdirModal}
                    makeMylistdir={makeMylistdir}
                    mylistdirs={mylistdirs}
                />
            }
            {openChangeMylistdirNameModal &&
                <ChangeMylistdirNameModal
                    setOpenChangeMylistdirNameModal={setOpenChangeMylistdirNameModal}
                    selectedMylistdir={selectedMylistdir}
                    changeMylistdirName={changeMylistdirName}
                    mylistdirs={mylistdirs}
                />
            }
            {openDeleteMylistdirModal &&
                <DeleteMylistdirModal
                    setOpenDeleteMylistdirModal={setOpenDeleteMylistdirModal}
                    selectedMylistdir={selectedMylistdir}
                    deleteMylistdir={deleteMylistdir}
                />
            }
            <CSSTransition in={popupFlag} classNames="popup" timeout={2000}>
                <div>{popupMsg}</div>
            </CSSTransition>
        </div>
    );
}


if (document.getElementById('mylist-page')) {
    ReactDOM.render(<MylistPage />,document.getElementById('mylist-page'));
}

