import React from 'react'
import { EPISODE_BASIC_DETAILS_MAPPING_KEYS, PHYSICIAN_DETAILS_MAPPING_KEYS } from '../../../../episodeManagement/admin/episodeManagement/constants';
import General from '../../../../../libs/utility/General';
import Container from '../../../../../components/container/Container';
import { responsiveLabelValueStyles } from '../../../../../components/responsiveLabelValue/ResponsiveLabelValue.styles';

const EpisodeDetails = ({ episodeDetails }) => {
    let episode = General.generateDataArray(EPISODE_BASIC_DETAILS_MAPPING_KEYS, episodeDetails);
    let physicianDetails = General.generateDataArray(PHYSICIAN_DETAILS_MAPPING_KEYS, episodeDetails.Physician);

    let finalEpisodeDetails = [...episode, ...physicianDetails];

    return (
        <React.Fragment>
            {finalEpisodeDetails.length ? finalEpisodeDetails.map((item, index) =>
                <Container header={item[0]?.category} containerMainClassName="mb-4" key={index}>
                    <div style={responsiveLabelValueStyles.labelValueContainer}>
                        {item?.map((item, index) => {
                            return (<div key={index} style={{ ...responsiveLabelValueStyles.labelValuePair, flexBasis: 'calc(25% - 16px)' }}>
                                <p style={{ ...responsiveLabelValueStyles.label }}>{General.formatLabelAndValue(item.label, item.value).label}</p>
                                <span style={{ ...responsiveLabelValueStyles.value }}>{General.formatLabelAndValue(item.label, item.value).value || General.formatLabelAndValue(item.label, item.value)?.label?.length !== 0 && "-"}</span>
                            </div>)
                        })}
                    </div>
                </Container>
            ) : ""}
        </React.Fragment>
    )
}

export default EpisodeDetails
