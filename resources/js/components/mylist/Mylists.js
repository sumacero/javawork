import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Pagination from './Pagination';
import QuestionList from './QuestionList';

function Mylists(props){
    const clickChangeMylistdirNameButton = () => {
        props.clickChangeMylistdirNameButton();
    }
    const clickDeleteMylistdirButton = () =>{
        props.clickDeleteMylistdirButton();
    }
    return(
        <div className="container mb-2">
            <div className="row border mb-2">
                <div className="col border">
                    <button className="btn btn-primary btn-block" onClick={clickChangeMylistdirNameButton}>マイリスト名の変更</button>
                </div>
                <div className="col border">
                    <button className="btn btn-primary btn-block" onClick={clickDeleteMylistdirButton}>マイリストの削除</button>
                </div>
            </div>
            <div>登録問題数:{props.paginationData.total}</div>
            {props.paginationData.total>0 ?
                <div>
                    <Pagination setPaginationData={props.setPaginationData} paginationData={props.paginationData} movePage={props.movePage}/>
                    <QuestionList mylists={props.mylists} deleteMylist={props.deleteMylist}/>
                </div>
                :
                <div className="text-center"> 
                    問題が登録されていません。
                </div>
            }
        </div>
    );
}

export default Mylists;