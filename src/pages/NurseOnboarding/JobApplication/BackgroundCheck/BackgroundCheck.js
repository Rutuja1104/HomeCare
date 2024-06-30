import React, { useEffect } from 'react'

import { HEADING } from '../../../../components/heading/constants/constants'
import { useDispatch, useSelector } from 'react-redux'
import { JOB_APPLICATION_TYPE, RESIDING_YEARS } from '../../constants'
import { VEC_ICON_NAME } from '../../../../components/icon/constants'

import { componentKey, setBackgroundCheckResidingYears, setJobApplicationActiveStep, setJobApplicationFormType, setStateResidingDropdownChange, setUploadedDocuments } from '../JobApplicationSlice'
import { componentKey as dataLoaderComponentKey } from "../../../../components/loaders/dataloader/DataLoaderSlice"
import { componentKey as NurseOnboardingComponentKey } from "../../../NurseOnboarding/NurseOnboardingSlice"
import { deleteDocumentFromS3AndDatabase, getPreSignedUrl, postStoreDocumentsToDatabase, putNurseStateResiding } from '../JobApplicationSaga'
import { BUTTON_TYPE } from '../../../../libs/constant'
import { toast } from 'react-toastify'

import Heading from '../../../../components/heading/Heading'
import ResponsiveBox from '../../../../components/responsivebox/ResponsiveBox'
import SelectDropdown from '../../../../components/dropdown/selectdropdown/SelectDropdown'
import Information from '../../../../components/information/Information'
import Button from '../../../../components/button/Button'
import FileUpload from '../../../../components/fileUpload/FileUpload'
import { useParams } from 'react-router-dom'
import { getDocumentFromS3Bucket } from '../../../StaffManagement/NurseManagement/NurseManagementSaga'

const BackgroundCheck = ({ activeIndex, applicationSteps }) => {

    const dispatch = useDispatch()

    const { applicationId, agencyId } = useParams();

    const { backgroundCheckResidingYears, backgroundCheck, backgroundCheckDocumentList, uploadedDocuments } = useSelector(state => state[componentKey])
    const { statesList } = useSelector(state => state[dataLoaderComponentKey])
    const { userRole, userId } = useSelector(state => state[NurseOnboardingComponentKey])

    useEffect(() => {
        const residingYear = RESIDING_YEARS.map(item => {
            return { value: `${item}`, label: item > 9 ? "More than 10 Years" : `${item} Year` }
        })
        dispatch(setBackgroundCheckResidingYears(residingYear))
    }, [])
    
    const handleSubmitBackgroundCheck = () => {
        if (backgroundCheck?.stateResiding?.label?.length !== 0 && backgroundCheck?.selectedResidingYear.value.length !== 0) {
            const data = {
                "StateResidence": backgroundCheck.stateResiding.label,
                "residenceYears": Number(backgroundCheck.selectedResidingYear.value),
                "applicationFormStep": "Step-7"
            }
    
            if (uploadedDocuments?.BackgroundCheck?.length === 0 || uploadedDocuments?.BackgroundCheck === undefined) {
                dispatch(putNurseStateResiding({ applicationId, data, agencyId, activeIndex }));
            } else {
                if (!uploadedDocuments?.BackgroundCheck?.some(item => item.s3Url && item.s3Url.length !== 0)) {
                    toast.error("Please upload document first!");
                } else {
                    dispatch(putNurseStateResiding({ applicationId, data, agencyId, activeIndex }));
                }
            }
    
            if (Object.keys(backgroundCheck.selectedResidingYear).every(key => !!backgroundCheck.selectedResidingYear[key])) {
                if (backgroundCheckDocumentList.length > 0 && uploadedDocuments?.BackgroundCheck?.every(item => item.s3Url && item.s3Url.length !== 0)) {
                    dispatch(postStoreDocumentsToDatabase(backgroundCheckDocumentList));
                }
            }
        } else {
            toast.error("Please select state and state residing years");
            window.scrollTo(0, 0);
        }
    }
    
    return (
        <React.Fragment>
            <Heading type={HEADING.H4}>State Residence :</Heading>
            <ResponsiveBox>
                <SelectDropdown
                    type='text'
                    placeHolder={'Please select state'}
                    name='stateResiding'
                    value={backgroundCheck.stateResiding}
                    onSelectCb={(name, selectedOption) => dispatch(setStateResidingDropdownChange({ name, selectedOption }))}
                    options={statesList}
                />
                <div></div>
                <div></div>
            </ResponsiveBox>

            <Heading type={HEADING.H4}>How long you've been residing in this state :</Heading>
            <ResponsiveBox>
                <SelectDropdown
                    type='text'
                    placeHolder={'Please select residing year'}
                    name='selectedResidingYear'
                    value={backgroundCheck.selectedResidingYear}
                    onSelectCb={(name, selectedOption) => dispatch(setStateResidingDropdownChange({ name, selectedOption }))}
                    options={backgroundCheckResidingYears}
                />
                <div></div>
                <div></div>
            </ResponsiveBox>

            {Object.keys(backgroundCheck.selectedResidingYear).every(key => !!backgroundCheck.selectedResidingYear[key]) ?
                <>
                    <Heading customStyle={{ marginTop: "20px" }} type={HEADING.H4}>Upload copy of your background check receipt, Once it is completed</Heading>
                    <Information iconName={VEC_ICON_NAME.ALERT_ROUNDED_ICON}>
                        {+backgroundCheck.selectedResidingYear.value <= 4 ?
                            "To move forward with your application, please complete BCI and FBI verifications. As your state residency is less than 5 years, proof is required." :
                            "To move forward with your application, please complete BCI verifications. As your state residency is more than 5 years, proof is required."}
                    </Information>
                    <FileUpload
                        onUploadDocumentCb={(file, idx) => {
                            const data = {
                                userId: applicationId,
                                agencyId: agencyId,
                                fileName: file.name,
                                type: userRole
                            }
                            dispatch(getPreSignedUrl({ data, file, applicationId, agencyId: agencyId, documentType: "BackgroundCheck", userId, uploadedDocuments, idx }))
                        }}
                        onUploadFiles={(file) => {
                            const copiedFiles = { ...uploadedDocuments }
                            if (Object.hasOwnProperty.call(copiedFiles, "BackgroundCheck")) {
                                copiedFiles["BackgroundCheck"] = [...copiedFiles["BackgroundCheck"], file.slice(-1)[0]];
                            } else {
                                copiedFiles["BackgroundCheck"] = [file.slice(-1)[0]];
                            }
                            dispatch(setUploadedDocuments(copiedFiles))
                        }}
                        onRemoveFilesCb={(idxx, s3Url) => {
                            if (s3Url) {
                                dispatch(deleteDocumentFromS3AndDatabase({ s3Url, documentType: "BackgroundCheck" }))
                            }

                            const copiedFiles = { ...uploadedDocuments }
                            copiedFiles["BackgroundCheck"] = copiedFiles["BackgroundCheck"].filter((item, index) => index !== idxx)
                            dispatch(setUploadedDocuments(copiedFiles))
                        }}
                        uploadedFiles={uploadedDocuments.BackgroundCheck}
                        onPreviewCb={(url) => dispatch(getDocumentFromS3Bucket(url))}
                    />
                </> : null
            }

            <div className='mt-5'>
                <Button
                    className="button-width me-3"
                    variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER}
                    onClickCb={() => {
                        dispatch(setJobApplicationFormType(JOB_APPLICATION_TYPE.Professional_Information))
                        dispatch(setJobApplicationActiveStep(applicationSteps - 1))
                    }}
                >Back</Button>
                <Button className="button-width" onClickCb={handleSubmitBackgroundCheck}>Submit</Button>
            </div>

        </React.Fragment>
    )
}

export default BackgroundCheck
