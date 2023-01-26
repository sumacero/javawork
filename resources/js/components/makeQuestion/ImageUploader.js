import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';

function ImageUploader(props) {
    const fileChange = (event) => {
        if (event.target.files.length === 0){
            return;
        }
        const file = event.target.files[0];
        if (file.type !== "image/png" && file.type !== "image/jpeg"){
            alert("pngファイルかjpegファイルを選択してください");
            return;
        }
        if (file.size > 1000000){
            alert("ファイルサイズが1Mバイトを超えています");
            return;
        }
        let reader = new FileReader();
        //dataURL形式でファイルを読み込む
        reader.readAsDataURL(file);
        //ファイルの読込が終了した時の処理
        reader.onload = function(){
            const dataUrl = reader.result;
            const fileName = file.name;
            let index = 0;
            if(props.images.length > 0){
                index = Math.max(...props.images.map(image => image.index)) + 1;
            }
            const obj = {
                "index":index,
                "fileName":fileName,
                "dataUrl":dataUrl
            }
            props.setImages([...props.images, obj]);
        }
    };
    return (
        <div className="row">
            <div className="col">
                <input 
                    type="file"
                    accept="image/png,image/jpeg"
                    onChange={fileChange}
                >
                </input>
                {props.error && <span className="text-danger">{props.error}</span>}
            </div>
        </div>
    );
}

export default ImageUploader;