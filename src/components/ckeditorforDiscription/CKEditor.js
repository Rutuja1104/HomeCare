import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import ErrorsList from '../input/errorslist/ErrorsList';

const MyCKEditor = ({
    editorData,
    label,
    name = "",
    value = "",
    rules = {},
    errors = {},
    formSubmitted = false,
    onChangeCb = () => { },
    formSubmittedCb = () => { },
    disabled = false
}) => {
    const [editorInstance, setEditorInstance] = useState(null);
    const [isTouched, setIsTouched] = useState(false);


    const handleEditorDataChange = (event, editor) => {
        const newData = editor.getData();

        if (isTouched) {
            onChangeCb({ target: { value: newData, name } }, rules)
        } else {
            onChangeCb({ target: { value: newData, name } })
        }
    }

    const editorConfig = {
        toolbar: {
            items: [
                'bold',
                'italic',
                'underline',
                '|',
                'bulletedList',
                'numberedList',
                '|',
                'alignment',
                // 'blockQuote',
                'undo',
                'redo',
            ],
        },
    };

    useEffect(() => {
        if (formSubmitted) {
            setIsTouched(true)
            formSubmittedCb({ target: { name, value } }, rules)
        } else {
            setIsTouched(false)
        }
    }, [formSubmitted, errors])

    const getErrorStyles = () => {
        if (Object.keys(errors).length > 0 || (isTouched && rules?.required && value.length == 0)) {
            return 'date-picker-error-styles'
        } else {
            return {};
        }
    }

    return (
        <>
            {label && <label className='date-label'>{label} <span style={{ color: "red" }}>{rules.required && ' *'}</span></label>}
            <CKEditor
                editor={ClassicEditor}
                data={editorData}
                onReady={(editor) => setEditorInstance(editor)}
                onChange={handleEditorDataChange}
                config={editorConfig}
                className={`date-picker ${getErrorStyles()} `}
            />
            <ErrorsList errors={errors} />
        </>
    );
};

export default MyCKEditor;
