import React from 'react';
import {ClipLoader} from "react-spinners";

const Loading = () => {
    return (
        <div style={{
            position: 'fixed',
            top: '0',
            width: '100%',
            height: '100%',
            zIndex: '2',
            background: 'rgb(255, 255, 255, 0.9)'
        }}>
            <div
                style={{position: 'fixed', top: '50%', left: '50%', zIndex: '999', transform: 'translate(-50%, -50%)'}}>
                <ClipLoader color={'#000000'} size={100}/>
            </div>
        </div>
    );
};

export default Loading;