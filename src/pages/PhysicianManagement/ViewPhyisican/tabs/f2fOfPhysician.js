import React from 'react';
import Label from '../../../../components/label/labelV2/Label';
import moment from 'moment';
const F2FOfPhysician = ({ data }) => {

    return (
        <div className="f2f-container">
            <div className=''>
                {data?.faceToFace &&
                    data?.faceToFace.map((item, index) => (
                        <div className='f2f-for-one' key={index}>
                            <h4>Face to Face information : {index + 1}</h4>
                            <div key={item} className="information">
                                <div className="block">
                                    <Label>Patient name</Label>
                                    <p>{item?.patientName || '-'}</p>
                                </div>
                                <div className="block">
                                    <Label>Patient's DOB</Label>
                                    <p>{item.patientDOB ? moment(item?.patientDOB).format("MM-DD-YYYY") : '-'}</p>
                                </div>
                                <div className="block"></div>
                                <div className="block"></div>
                                <div className="block"></div>
                            </div>

                            {item?.physicianAttestation && (
                                <div>
                                    <Label>Physician Attention</Label>
                                    {item?.physicianAttestation.map((item) => (
                                        <div key={item}>
                                            <div className="information">
                                                <div>
                                                    <Label>Physician Name</Label>
                                                    <p>{item?.physicianName || '-'}</p>
                                                </div>
                                                <div>
                                                    <Label>Non- Practitioner Name</Label>
                                                    <p>{item?.practitionerName || '-'}</p>
                                                </div>
                                                <div>
                                                    <Label>License No</Label>
                                                    <p>{item?.licenseNo || '-'}</p>
                                                </div>
                                                <div>
                                                    <Label>Attestation Date</Label>
                                                    <p>{moment(item?.attestationDate).format('MM-DD-YYYY') || '-'}</p>
                                                </div>
                                            </div>
                                            <div className="" key={item}>
                                                <Label>Clinical Findings</Label>
                                                <p>{item?.clinicalFindings || '-'}</p>
                                            </div>
                                            <div className="" key={item}>
                                                <Label>Clinical Finding Reason</Label>
                                                <p>{item?.clinicalFindingsReason || '-'}</p>
                                            </div>
                                            <div className="" key={item}>
                                                <Label>Encounter Description</Label>
                                                <p>{item?.encounterDescription || '-'}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {item?.physicianSignature && (
                                <div className="block">
                                    <Label>Physician's Sign</Label>
                                    <img src={item?.physicianSignature} />
                                </div>
                            )}

                            {/* {item?.quallifyingEncounterType && (
                            <div className="">
                                <Label>Qualifying Encounter</Label>
                                {item?.quallifyingEncounterType.map((i) => (
                                    <ul key={i}>
                                        <div className="" key={i}>
                                            <p>{i?.service}</p>
                                            <p>{i?.providerName}</p>
                                            <p>{i?.questionResponse}</p>
                                            <p>{moment(i?.dateConducted).format('MM-DD-YYYY') || '-'}</p>
                                        </div>
                                    </ul>
                                ))}
                            </div>
                        )} */}
                        </div>
                    ))}
            </div>
        </div>
    );
};
export default F2FOfPhysician;
