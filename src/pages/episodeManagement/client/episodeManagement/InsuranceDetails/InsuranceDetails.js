import React from 'react'
import { useSelector } from 'react-redux'
import { componentKey } from '../ClientEpisodeManagementSlice'
import Container from '../../../../../components/container/Container'
import ResponsiveLabelValue from '../../../../../components/responsiveLabelValue/ResponsiveLabelValue'

const InsuranceDetails = () => {
    const { insuranceDetails } = useSelector(state => state[componentKey])

    return (
        <React.Fragment>
            {insuranceDetails.length ? insuranceDetails.map((item, index) =>
                <Container header={item[0]?.category} containerMainClassName="mb-4" key={index}>
                    <ResponsiveLabelValue data={item} />
                </Container>
            ) : ""}
        </React.Fragment>
    )
}

export default InsuranceDetails
