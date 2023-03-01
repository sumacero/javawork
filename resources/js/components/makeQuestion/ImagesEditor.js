import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";
import ImageViewer from './ImageViewer';


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
        <div className="row row-cols-2 border">
            {props.images.map((image) => 
                <div key={image.index} className="col border"> 
                    <ImageViewer
                        image={image}
                        dragStart={dragStart}
                        drop={drop}
                        deleteClick={deleteClick}
                    />
                </div>
            )}
            </div>
    );
}

export default ImagesEditor;