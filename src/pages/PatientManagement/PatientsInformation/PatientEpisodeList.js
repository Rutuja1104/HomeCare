import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { getPatientEpisodeList } from '../referral-intake/PatientManagementSaga'
import { useNavigate, useParams } from 'react-router-dom'
import { componentKey, setSelectedPatientEpisode, setShowPatientEpisodeDetails } from '../referral-intake/PatientManagementSlice'
import { EPISODE_MANAGEMENT } from '../../../routes/constants'
import { Collapse } from 'reactstrap'
import { BUTTON_TYPE } from '../../../libs/constant'
import { VEC_ICON_NAME } from '../../../components/icon/constants'

import General from '../../../libs/utility/General'
import PatientEpisodeDetails from './EpisodeDetails/PatientEpisodeDetails'
import ImageWithDescription from '../../../components/ImageWithDescription/ImageWithDescription'
import Container from '../../../components/container/Container'
import Button from '../../../components/button/Button'

const PatientEpisodeList = () => {
    const [randomNumber, setRandomNumber] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { patientId } = useParams()

    const agencyId = General.getLocalStorageData("agencyId")

    const { patientEpisodeList, showPatientEpisodeDetails, selectedPatientEpisode } = useSelector(state => state[componentKey])

    useEffect(() => {
        dispatch(getPatientEpisodeList({ agencyId, patientId }))
        setRandomNumber(Math.random().toFixed(36).substring(2, 6))
    }, [])

    return (
        <div>
            {patientEpisodeList.length !== 0 &&
                <div className='d-flex justify-content-end mb-3'>
                    <Button styles={{ height: "36px" }} variant={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} prefixProps={{ icon: VEC_ICON_NAME.ADD_NEW_ICON }} onClickCb={() => navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.CREATE_EPISODE}/${patientId}`)}>New Episode</Button>
                </div>
            }
            <div className="mb-3">
                <div className="custom-collapse" >
                    <div>
                        <span className="document-name">
                            Charts #{randomNumber}
                        </span>
                    </div>
                </div>
            </div>
            <Collapse isOpen={true}>
                <Container containerMainClassName="collapse-container">
                    {patientEpisodeList.length ? patientEpisodeList.map((item, idx) => {
                        return (
                            <div key={idx} className="mb-3">
                                <div
                                    onClick={() => {
                                        dispatch(setShowPatientEpisodeDetails(!showPatientEpisodeDetails))
                                        dispatch(setSelectedPatientEpisode(item))
                                    }}
                                    className="custom-collapse"
                                >
                                    <div>
                                        <span className="document-name">
                                            #{item.id.slice(0, 4)} Episode
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )
                    }) :
                        <ImageWithDescription
                            className="assign-episode-img"
                            content="No episode has been assigned yet"
                            buttonTitle="Assign Episode"
                            onClickCb={() => navigate(`/${EPISODE_MANAGEMENT.EPISODE_MANAGEMENT}/${EPISODE_MANAGEMENT.CHILD_ROUTS.CREATE_EPISODE}/${patientId}`)}
                        />
                    }
                </Container>
            </Collapse>

            <PatientEpisodeDetails
                isOpen={showPatientEpisodeDetails}
                toggle={() => dispatch(setShowPatientEpisodeDetails(!showPatientEpisodeDetails))}
                episodeDetails={selectedPatientEpisode}
            />
        </div>
    )
}

export default PatientEpisodeList
