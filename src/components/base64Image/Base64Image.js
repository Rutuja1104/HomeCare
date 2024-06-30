import React from 'react';
import Label from '../label/labelV2/Label';

const Base64Image = ({ base64, header = "" }) => {

    if (!base64) {
        return <div>No image data provided.</div>;
    }

    let imageUrl = ""
    if (base64.includes("data:image/png;base64,")) {
        imageUrl = base64
    } else {
        imageUrl = `data:image/png;base64,${base64}`;
    }

    return (
        <div className='base64-container'>
            <Label>{header}</Label>
            <img
                src={imageUrl}
                alt="Base64 Image"
                style={{ width: '200px', height: 'auto' }}
                className='base-64-image'
            />
        </div>
    );
};

export default Base64Image;