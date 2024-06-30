import React, { useEffect, useRef, useState } from 'react';
import Signature from 'signature_pad';
import { ClearAllTwoTone, Redo, Undo } from '@mui/icons-material';
import Button from '../button/Button';
import { BUTTON_TYPE } from '../../libs/constant';

export default function SignaturePad({
    saveSignatureCb = () => { },
    disabled,
    savedSignature = "",
    onPrevCb = () => { },
    isPreviousAllowed = false,
    isNextAllowed = true,
    getSignature = () => { },
    isGetSignature = false,
    submitButtonText = "Proceed"
}) {

    const [isGetSignaturee, setIsGetSignature] = useState(isGetSignature)
    const signaturePadRef = useRef(null);
    let signatureRedoArray = [];

    useEffect(() => {
        readyPad();
    }, []);

    const readyPad = () => {
        let wrapper = document.getElementById('signature-pad');
        let canvas = wrapper?.querySelector('canvas');
        canvas.getContext('2d').scale(1, 1);
        let tempSignaturePad = new Signature(canvas, {
            backgroundColor: 'rgb(255, 255, 255)',
        });
        signaturePadRef.current = tempSignaturePad;
    };

    useEffect(() => {
        if (savedSignature) {
            const signaturePad = signaturePadRef.current;
            if (signaturePad) {
                signaturePad.clear(); // Clear any existing content
                signaturePad.fromDataURL(savedSignature);
            }
        }
    }, [savedSignature]);

    const handleUndo = () => {
        let signatureRemovedData = [];
        const signaturePad = signaturePadRef.current;
        if (signaturePad) {
            let signatureData = signaturePad.toData();
            let signatureRedoData = [...signatureData]; // Clone the original data

            if (signatureData.length > 0) {
                signatureData.pop(); // Remove the last dot or line
                signaturePad.fromData(signatureData);
                signatureRemovedData = signatureRedoData[signatureRedoData.length - 1];
                signatureRedoArray.push(signatureRemovedData);
            }
        }
    };

    const handleRedo = () => {
        const signaturePad = signaturePadRef.current;
        if (signaturePad && signatureRedoArray.length !== 0) {
            let values = signaturePad.toData();
            let lastValue = signatureRedoArray[signatureRedoArray.length - 1];
            values.push(lastValue);
            signaturePad.fromData(values);
            signatureRedoArray.pop(); // Remove the redo item from the array
        }
    };

    const handleClear = () => {
        const signaturePad = signaturePadRef.current;
        if (signaturePad) {
            signaturePad.clear();
        }
    };

    useEffect(() => {
        getSignature(signaturePadRef.current?.toDataURL(), signaturePadRef.current?.isEmpty())
        setIsGetSignature(false)
    }, [isGetSignaturee])

    return (
        <div className='App'>
            <div id='signature-pad'>
                <canvas className='signature-canvas'></canvas>
                <div className='sig-btns'>
                    <button
                        type='button'
                        className='btn me-2 btn-danger btn-icon mb-2'
                        onClick={handleClear}
                    >
                        <ClearAllTwoTone />
                    </button>
                    <button
                        type='button'
                        className='btn me-2 btn-primary btn-icon t mb-2'
                        onClick={handleRedo}
                    >
                        <Redo />
                    </button>
                    <button
                        type='button'
                        className='btn btn-light btn-icon me-2 mb-2'
                        onClick={handleUndo}
                    >
                        <Undo />
                    </button>
                </div>

                {isPreviousAllowed && <Button className='button-width mt-5 me-3' variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={onPrevCb} >Back</Button>}
                {isNextAllowed && <Button className='button-width mt-5' disabled={disabled} onClickCb={() => saveSignatureCb(signaturePadRef.current?.toDataURL(), signaturePadRef.current?.isEmpty())}>{submitButtonText}</Button>}
            </div>
        </div>
    );
}
