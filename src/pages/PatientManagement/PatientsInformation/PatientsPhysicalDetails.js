import React from 'react';
import Heading from '../../../components/heading/Heading';
import { HEADING } from '../../../components/heading/constants/constants';
import Label from '../../../components/label/labelV2/Label';

const PatientsPhysicialDetails = ({ data }) => {

    return (
        <div className="patients-physician-container">
            <div className="physcian-block-1">
                {/* <Heading type={HEADING.h6}>Physician Details</Heading> */}
                <div className="block">
                    <Label>NPI Number</Label>
                    <p>{data?.physician?.NPI || "-"}</p>
                </div>
                <div className="block">
                    <Label>Physician Name</Label>
                    <p>{`${data?.physician?.firstName || '-'} ${data?.physician?.lastName || ''}`.trim()}</p>
                </div>
                <div className="block">
                    <Label>Primary Email</Label>
                    <p>{data?.physician?.primaryEmail || '-'}</p>
                </div>
                <div className='block'></div>
                <div className='block'></div>
            </div>
            <div className="physcian-block-1">
                <div className="block">
                    <Label>FAX Number</Label>
                    <p>{data?.physician?.fax || '-'}</p>
                </div>
                <div className="block">
                    <Label>Secondary Email</Label>
                    <p>{data?.physician?.secondaryEmail || '-'}</p>
                </div>
                <div className='block'></div>
                <div className='block'></div>
                <div className='block'></div>
               
            </div>
        </div>
    );
};

export default PatientsPhysicialDetails;
