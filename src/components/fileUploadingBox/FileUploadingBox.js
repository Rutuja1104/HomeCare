import React, { useState } from 'react';
import Icons from '../icon/Icon';
import { VEC_ICON_NAME } from '../icon/constants';

const FileUploadingBox = () => {
    const [dragging, setDragging] = useState(false);
    const [files, setFiles] = useState([]);
    const [previewFile, setPreviewFile] = useState(null);

    const handleDragEnter = (e) => {
        e.preventDefault();
        setDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const droppedFiles = Array.from(e.dataTransfer.files);
        setFiles([...files, ...droppedFiles]);
    };

    const handlePreview = (file) => {
        setPreviewFile(file);
    };
    const closePreview = () => {
        setPreviewFile(null);
    };
    const handleFileRemove = (indexToRemove) => {
        const updatedFiles = files.filter((_, index) => index !== indexToRemove);
        setFiles(updatedFiles);
    };
    return (
        <div>
            <div className="list-of-documents">
                <ul>
                    {files?.map((file, index) => (
                        <li key={index}>
                            <Icons iconName={VEC_ICON_NAME.FILE_UPLOADING_ICON} />
                            <span>{file.name} .</span>
                            <span onClick={() => handlePreview(file)}>Preview</span>
                        </li>
                    ))}
                </ul>
                {previewFile && (
                    <div className="file-preview">
                        <button onClick={closePreview}>Close Preview</button>
                        <object
                            data={URL.createObjectURL(previewFile)}
                            type="application/pdf"
                            width="100%"
                            height="500px"
                        >
                            PDF Viewer not available. You can download the file instead.
                        </object>
                    </div>
                )}
            </div>
            <div
                className={`file-upload-container ${dragging ? 'dragging' : ''}`}
                onDragEnter={handleDragEnter}
                onDragOver={(e) => e.preventDefault()}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
            >
                <div className="icon-container">
                    <Icons iconName={VEC_ICON_NAME.FEATHER_UPLOAD_CLOUD_ICON} />
                </div>
                <div className="info-conntainer">
                    <p>Select a file or drag and drop here</p>
                    <p>JPG, PNG or PDF, file size no more than 10MB</p>
                </div>
            </div>
        </div>
    );
};

export default FileUploadingBox;
