import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useForm } from "react-hook-form";

function ImageViewer(props) {
    return (
        <div className="border">
            <label>画像インデックス:{props.image.index}</label>
            <img
                className="img-fluid"
                src={props.image.dataUrl}
                alt={props.image.fileName}
                onDragStart={() => props.dragStart(props.image.index)}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => props.drop(props.image.index)}
            >
            </img>
            <div className="text-center">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={() => props.deleteClick(props.image.index)}
                    tabIndex="-1"
                >
                    画像の削除
                </button>
            </div>
        </div>
    );
}

export default ImageViewer;