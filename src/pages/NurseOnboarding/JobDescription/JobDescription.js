import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { JOB_DESCRIPTION } from '../constants';
import { HEADING } from '../../../components/heading/constants/constants';
import { componentKey, setActiveTabIndex, setSignatureOnJobDescription } from '../NurseOnboardingSlice';
import { postAppendDocument } from '../NurseOnboardingSaga';
import { VEC_ICON_NAME } from '../../../components/icon/constants';
import { useParams } from 'react-router-dom';

import Heading from '../../../components/heading/Heading';
import Information from '../../../components/information/Information';
import Base64Image from '../../../components/base64Image/Base64Image';

const JobDescription = () => {
    const [selectedJobDescription, setSelectedJobDescription] = useState();

    const dispatch = useDispatch();
    const { applicationId, agencyId, role } = useParams();
    const { signatureInBase64 } = useSelector((state) => state[componentKey]);

    useEffect(() => {
        dispatch(setActiveTabIndex(1));
    }, []);

    useEffect(() => {
        if (role) {
            const description = JOB_DESCRIPTION.find((item) => item.role == role);
            if (description) {
                setSelectedJobDescription(description?.data);
            }
        }
    }, [role]);

    const handleSaveSignatureClick = (sign, isCanvasEmpty) => {
        if (!isCanvasEmpty) {
            dispatch(setSignatureOnJobDescription(sign));
            dispatch(
                postAppendDocument({
                    applicationId: applicationId || '',
                    imageBase64: sign,
                    agencyId: agencyId,
                    fileName: 'job-description.pdf',
                    fileType: 'jobDescription',
                    activeTabIndex: 2
                })
            );
            window.scrollTo(0, 0)
        } else {
            toast.error('Please sign the consent form!');
        }
    };

    const handlePrevClick = () => {
        dispatch(setActiveTabIndex(0));
    };
    const renderDescription = (description, parentTitle = '', level = 0) => {

        return (
            <ul className='mt-1 mb-1'>
                {description.map((data, key) => (
                    <React.Fragment key={key + 5}>
                        {data.isHeader ? (
                            <li className="font-weight-600" style={data.isSubHeader && { listStyle: "none" }}>
                                {data.title}
                            </li>
                        ) : (
                            <li className={'font-weight-600'} style={data?.description?.length && { listStyle: "none" }}>
                                {data.text}
                                {data.description && renderDescription(data.description, parentTitle, level)}
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ul>
        );
    };

    return (
        <React.Fragment>
            {selectedJobDescription ? (
                selectedJobDescription?.map((item, index) => {
                    return (
                        <React.Fragment key={index}>
                            {item?.isSummary && <Information>{item?.text}</Information>}
                            {item?.isHeader && (
                                <>
                                    {item.isSubHeader ?
                                        <Heading type={HEADING.H2} customStyle={{ fontSize: "16px" }}>
                                            {item.title}
                                        </Heading> :
                                        <Heading customStyle={{ marginTop: '40px' }} type={HEADING.H2}>
                                            {item.title}
                                        </Heading>
                                    }
                                </>
                            )}
                            {item?.description &&
                                renderDescription(
                                    item.description,
                                    item.title,
                                    item.title === 'Responsibilities' ? 'circle' : 'none'
                                )
                            }
                            {item?.isFooter &&
                                <Information iconName={VEC_ICON_NAME.ALERT_ROUNDED_ICON} className="mt-3 mb-5">
                                    {item.text}
                                </Information>
                            }
                        </React.Fragment>
                    );
                })
            ) : (
                <div>Job Description Not Found</div>
            )}
            <Base64Image base64={signatureInBase64} header="Applicant Signature" />
        </React.Fragment>
    );
};

export default JobDescription;
