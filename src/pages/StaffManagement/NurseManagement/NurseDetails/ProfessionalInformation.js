import React from 'react'
import { useSelector } from 'react-redux'
import { componentKey } from '../NurseListing/NurseListingSlice'
import Container from '../../../../components/container/Container'
import ResponsiveLabelValue from '../../../../components/responsiveLabelValue/ResponsiveLabelValue'

const ProfessionalInformation = () => {

    const { professionalInformation } = useSelector(state => state[componentKey])

    return (
        <div>
            {professionalInformation?.length ? professionalInformation.map((item, index) =>
                <Container header={item[0]?.category} containerMainClassName="mb-4" key={index}>
                    <ResponsiveLabelValue data={item} />
                </Container>
            ) : ""}
        </div>
    )
}

export default ProfessionalInformation
