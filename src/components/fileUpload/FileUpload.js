import React, { useEffect, useState } from 'react'
import { VEC_ICON_NAME } from '../icon/constants'
import Icons from '../icon/Icon'
import Heading from '../heading/Heading'
import { HEADING } from '../heading/constants/constants'
import { Close } from '@mui/icons-material'
import { toast } from 'react-toastify'

const FileUpload = ({
    label = "",
    isMultipleDocuments = true,
    onUploadDocumentCb = () => { },
    onUploadFiles = () => { },
    uploadFiles = true,
    className = "",
    uploadedFiles = [],
    isUploadable = true,
    isRemoveAbel = true,
    onPreviewCb = () => { },
    onRemoveFilesCb = () => { }
}) => {
    const [dragging, setDragging] = useState(false)
    const [files, setFiles] = useState([])
    const fileInputRef = React.createRef()

    useEffect(() => {
        if (uploadedFiles.length) {
            setFiles(uploadedFiles)
        }
    }, [uploadedFiles])

    const handleDragEnter = (e) => {
        e.preventDefault()
        setDragging(true)
    }

    const handleDragLeave = (e) => {
        e.preventDefault()
        setDragging(false)
    }

    const handleDrop = (e) => {
        e.preventDefault()
        setDragging(false)

        const droppedFiles = Array.from(e.dataTransfer.files);

        const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];

        const validFiles = droppedFiles.filter((file) => {
            return allowedTypes.includes(file.type);
        });
    
        if (validFiles.length === 0) {
            toast.error('Invalid file type. Please upload JPG, PNG, or PDF files.');
            return;
        }

        if (isMultipleDocuments) {
            setFiles([...files, ...droppedFiles]);
            onUploadFiles([...files, ...droppedFiles])
        } else {
            setFiles([e.dataTransfer.files[0]])
            onUploadFiles([e.dataTransfer.files[0]])
        }
    }

    const handleFiles = (file) => {

        const filesArray = Array.from(file);
        const invalidFiles = [];
    
        filesArray.forEach(file => {
            if (file.size > 9.50 * 1024 * 1024) { // 10MB in bytes
                invalidFiles.push(file);
            }

            const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf'];
            if (!allowedTypes.includes(file.type)) {
                invalidFiles.push(file);
            }
        });

        if (invalidFiles.length > 0) {
            const invalidFileNames = invalidFiles.map(file => file.name).join(', ');
            toast.error(`Invalid file type or document size exceeds the allowed limit. Unsupported files: ${invalidFileNames}`);
            return;
        }

        if (isMultipleDocuments) {
            setFiles([...files, ...file])
        } else {
            setFiles([file[0]])
        }

        onUploadFiles([...files, ...file])
    }

    const handleClickHere = () => {
        fileInputRef.current.click()
    }

    const handleRemoveDocumentClick = (idx, s3Url) => {
        onRemoveFilesCb(idx, s3Url)
        const updatedFiles = files.filter((_, index) => index !== idx);
        setFiles(updatedFiles);
        if(updatedFiles?.length===0){
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    }

    return (
        <React.Fragment>
            {label && <Heading customStyle={{ marginTop: "15px" }} type={HEADING.H3}>{label}</Heading>}

            {isUploadable &&
                <div className={`file-upload ${dragging ? " dragging-on" : ""} ${className ? className : ""}`} onDragEnter={handleDragEnter} onDragOver={(e) => e.preventDefault()} onDragLeave={handleDragLeave} onDrop={handleDrop}>
                    <Icons iconName={VEC_ICON_NAME.FEATHER_UPLOAD_CLOUD_ICON} />
                    <div className="">
                        <Heading>Drag and drop or <span className='click-here' onClick={handleClickHere}>Click Here</span> to upload a file</Heading>
                        <span className='file-info'>JPG, PNG, or PDF, file size no more than 10MB</span>
                    </div>
                </div>
            }
            {files?.map((file, idx) => {
                return (
                    <div className='file-list' key={idx}>
                        <div className='file-icon'>
                            <Icons iconName={VEC_ICON_NAME.FILE_UPLOADING_ICON} />
                            <div>
                                <span className='file-name me-2'>{file?.s3Url?.length ? file?.s3Url ? file?.s3Url?.split("/")?.slice(-1)[0] : "" : file?.name}</span>
                                {uploadFiles && <span className='upload-document' onClick={() => file?.s3Url?.length ? onPreviewCb(file?.s3Url) : onUploadDocumentCb(file, idx)}>{file?.s3Url?.length ? "Preview" : "Upload"}</span>}
                            </div>
                        </div>
                        {(isRemoveAbel) &&
                            <div>
                                <Close onClick={() => handleRemoveDocumentClick(idx, file?.s3Url)} />
                            </div>
                        }
                    </div>
                )
            })}

            <input type="file" ref={fileInputRef} style={{ display: 'none' }} onChange={(e) => handleFiles(e.target.files)} accept=".jpg, .png, .pdf" multiple={isMultipleDocuments} />
        </React.Fragment>
    )
}

export default FileUpload
