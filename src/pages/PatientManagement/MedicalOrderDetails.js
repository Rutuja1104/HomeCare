import React from 'react';
import Heading from '../../components/heading/Heading';
import { HEADING } from '../../components/heading/constants/constants';
import FileUpload from '../../components/fileUpload/FileUpload';
const MedicalOrderDetails = () => {
    return (
        <div className="medicalOrderDetails-container">
            <Heading type={HEADING.H3}>Share Report</Heading>
            <div className="documnets-container">
                <div className="block">
                    <FileUpload className="mb-2" label='Via fax'/>
                </div>
                <div className="">
                    <span>OR</span>
                </div>
                <div className="block">
                    <FileUpload className="mb-2" label='Via Mail'/>
                </div>
            </div>
        </div>
    );
};
export default MedicalOrderDetails;
