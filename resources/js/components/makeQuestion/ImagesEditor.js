import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import TextareaAutosize from 'react-textarea-autosize';

function ImagesEditor(props) {
    const [dragIndex, setDragIndex] = useState(null);
    const dragStart = (index) => {
        setDragIndex(index);
        props.setHoldImageType(props.imageType);
    };
    const drop = (index) => {
        if (index === dragIndex || props.holdImageType != props.imageType) return;
        props.setImages(
            props.images.map(image => {
                if(image.index === dragIndex){
                    // ホールド元画像のindexを変更
                    image.index = index;
                    return image;
                }
                if(image.index === index){
                    // ホールド先画像のindexを変更
                    image.index = dragIndex;
                    return image;
                }
                return image;
            }).sort(function(a, b) {
                return (a.index < b.index) ? -1 : 1;  //昇順の並び替え
            })
        );
    }
    const deleteClick = (index) =>{
        props.setImages(
            props.images.filter((image) => (image.index !== index))
        )
    }
    return (
        <div className="row border">
            {props.images.map((image) => 
                <div key={image.index} className="col border">
                    <label>{image.fileName}:{image.index}</label>
                    <img
                        className="img-fluid"
                        src={image.dataUrl}
                        alt={image.fileName}
                        onDragStart={() => dragStart(image.index)}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => drop(image.index)}
                    >
                    </img>
                    <div className="text-center">
                        <button
                            type="button"
                            className="btn btn-dark"
                            onClick={() => deleteClick(image.index)}
                            tabIndex="-1"
                        >
                            画像の削除
                        </button>
                    </div>
                </div>
            )}
            </div>
    );
}

export default ImagesEditor;