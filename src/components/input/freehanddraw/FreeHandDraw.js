import React, { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import Button from '../../button/Button';
import { BUTTON_TYPE } from '../../button/constants';
import { Theme } from '../../constants';
import styles from './FreeHandDraw.styles';

export default function FreeHandDraw({
    showSave = false,
    onClearCb = () => {},
    onSaveCb = () => {},
    canvasWidth = 500,
    canvasHeight = 200,
    penColor = "black",
    onStrokeEndCb = () => {},
    backgroundColor = Theme.WHITE_BACKGROUND,
    freeHandDrawnDataURL = "",
}) {
    const sigCanvasRef = useRef(null);

    useEffect(() => {
        if (freeHandDrawnDataURL) {
          const canvas = sigCanvasRef.current.getCanvas();
          const ctx = canvas.getContext('2d');
          const image = new Image();
          image.src = freeHandDrawnDataURL;
          image.onload = () => {
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
          };
        }
    }, [freeHandDrawnDataURL]);

    useEffect

    const clearCanvas = () => {
        sigCanvasRef.current.clear();
        onClearCb("");
    };

    const saveCanvas = () => {
        const dataURL = sigCanvasRef.current.toDataURL();
        onSaveCb(dataURL);
    };

    const handleEndStroke = () => {
        const dataURL = sigCanvasRef.current.toDataURL();
        onStrokeEndCb(dataURL);
    }

    return (
        <div style={styles.freeDrawContainer}>
            <SignatureCanvas
                ref={sigCanvasRef}
                penColor={penColor}
                canvasProps={{ width: canvasWidth, height: canvasHeight, className: 'signature-canvas' }}
                onEnd={handleEndStroke}
                backgroundColor={backgroundColor}
            />
            <div style={styles.canvasBtnDiv}>
                <Button type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={clearCanvas}>Clear</Button>
                {
                    (showSave) ?  <Button type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={saveCanvas}>Save</Button> : null            
                }
            </div>
        </div>
    );
};
