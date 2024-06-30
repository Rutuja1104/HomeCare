import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { componentKey as episodeListingComponentKey } from '../EpisodeManagementSlice'
import { setHeaderLabel } from '../../../../layouts/LayoutSlice'
import { HEADING } from '../../../../components/heading/constants/constants'
import { VEC_ICON_NAME } from '../../../../components/icon/constants'
import { getPatientDetailsById } from './PatientDetailsSaga'
import { useSearchParams } from 'react-router-dom'
import { componentKey } from './PatientDetailsSlice'

import Heading from '../../../../components/heading/Heading'
import ProfileImage from '../../../../components/profileImg/ProfileImage'
import IconLabel from '../../../../components/iconlabel/IconLabel'
import Loadable from '../../../../components/loadable/Loadable'
import TabbedNavigation from '../../../../components/tabbedNavigation/TabbedNavigation'
import PatientEpisodes from './patientEpisodes/PatientEpisodes'
import CustomCollapse from '../../../../components/accordion/CustomCollapse'
import InsuranceDetails from './InsuranceDetails/InsuranceDetails'
import BadgeV2 from '../../../../components/badge/BadgeV2'
import General from '../../../../libs/utility/General'

const PatientDetails = () => {

    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const patientId = searchParams.get("pid")

    const agencyId = General.getLocalStorageData("agencyId")
    const token = General.getLocalStorageData("token")

    const { loadingState } = useSelector(state => state[episodeListingComponentKey])
    const { patientDetails } = useSelector(state => state[componentKey])

    useEffect(() => {
        dispatch(setHeaderLabel("Episode Management"))
        dispatch(getPatientDetailsById({ agencyId, patientId: patientId, token }))
    }, [])

    const array = [
        {
            "label": "MRN",
            "value": patientDetails?.mrn,
            "category": "Personal Information"
        },
        {
            "label": "Gender",
            "value": patientDetails?.gender,
            "category": "Personal Information"
        },
        {
            "label": "Patient Type",
            "value": patientDetails?.patientType,
            "category": "Personal Information"
        },
        {
            "label": "Referred By",
            "value": `${patientDetails?.contact?.find(item => item?.contactType == "reference")?.contactFirstName || "-"}  ${patientDetails?.contact?.find(item => item?.contactType == "reference")?.contactLastName || "-"}`,
            "category": "Personal Information"
        },
        {
            "label": "SSN",
            "value": patientDetails?.ssn || "-",
            "category": "Personal Information"
        },
        {
            "label": "Insurance Name",
            "value": patientDetails?.payer?.length && patientDetails?.payer[0]?.payerName,
            "category": "Personal Information"
        }
    ]

    const tabList = [
        {
            title: "Episode",
            tabBodyComponent: <PatientEpisodes uuid={patientId} />,
            linkTo: "/tab1",
        },
        {
            title: "Insurance",
            tabBodyComponent: <InsuranceDetails />,
            linkTo: "/tab2",
        }
    ];

    const collapseData = [
        {
            name: "Patient Detail",
            component:
                <div className='patient-details mb-3'>
                    <div className='patient-basic-details-card patient-basic-info'>
                        <ProfileImage />
                        <div>
                            <Heading>{patientDetails?.firstName} {patientDetails?.lastName}</Heading>
                            <div className='d-flex'>
                                <IconLabel text={patientDetails?.phoneNumber || "-"} icon={VEC_ICON_NAME.CALL_ICON} labelStyles={{ marginRight: "15px" }} />
                                <IconLabel text={patientDetails?.email || "-"} icon={VEC_ICON_NAME.MAIL_OUTLINE} />
                            </div>
                            <div className='mt-3'>
                                <IconLabel text={`${patientDetails?.homeAddress?.addressLine1 || "-"} ${patientDetails?.homeAddress?.addressLine2 || "-"} ${patientDetails?.homeAddress?.city || "-"} ${patientDetails?.homeAddress?.country || "-"}`} icon={VEC_ICON_NAME.LOCATION_ICON_3} />
                            </div>
                        </div>
                    </div>
                    <div className='patient-basic-details-card patient-value-label-pair'>
                        <div className='patient-professional-info'>
                            {array?.map((item, index) => (
                                <div key={index} className='patient-label-value-pair'>
                                    <span style={{ whiteSpace: 'nowrap' }} className='patient-info-label text-capitalize'>{item.label}</span>
                                    <span style={{ whiteSpace: 'nowrap' }} className='patient-info-value text-capitalize'>{item.value}</span>
                                </div>
                            ))}
                        </div>
                        <div>
                            <BadgeV2 color={General.renderBadgeColor(patientDetails?.patientServiceStatus || "")}>{patientDetails?.patientServiceStatus}</BadgeV2>
                        </div>
                    </div>
                </div>
        }
    ]
    return (
        <Loadable loadingStates={loadingState.state} loadingMessage={loadingState.message}>
            <div className='episode-patient-details'>
                <Heading type={HEADING.H2}>Patient Details</Heading>
            </div>
            <CustomCollapse data={collapseData} isContainer={false} />
            <div>
                <TabbedNavigation tabList={tabList} />
            </div>
        </Loadable>
    )
}

export default PatientDetails