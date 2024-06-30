import React from 'react';
import styles from './ProgressStatus.styles';
import Heading from '../../components/heading/Heading';
import Icons from '../../components/icon/Icon';
import { VEC_ICON_NAME } from '../../components/icon/constants';

export default function ProgressStatus({
    activities,
    headerText,
    onClickCorrectIcon = () => { },
    onClickCrossIcon = () => { },
    isEditable = true,
}) {
    return (
        <div>
            <Heading>{headerText}</Heading>
            {activities.map((activity, index) => (
                <React.Fragment key={index}>
                    <div key={index} style={styles.mainContaniner}>
                        <div>
                            {(activity.active) || (activities.findIndex(item => item.active) > index) ?
                                <Icons familyName="vec" iconName={VEC_ICON_NAME.GREEN_ELLIPSE} /> :
                                <Icons familyName="vec" iconName={VEC_ICON_NAME.ELLIPSE_GREY_ICON} style={{ marginLeft: "15px" }} />
                            }
                        </div>

                        <div style={styles.activityInfo}>
                            <span style={styles.textContent}>{activity.info}</span>
                            <span style={styles.time}>{activity.time}</span>
                        </div>
                        {((isEditable && !activity.active && activity.isEditable)) && (
                            <div style={styles.activityContent}>
                                <div onClick={onClickCrossIcon} style={styles.icons}>
                                    <Icons familyName="vec" iconName={VEC_ICON_NAME.CROSS_ICON} style={styles.action} />
                                </div>
                                <div onClick={onClickCorrectIcon} style={styles.icons}>
                                    <Icons familyName="vec" iconName={VEC_ICON_NAME.CORRECT_ICON} style={styles.action} />
                                </div>
                            </div>
                        )}
                    </div>
                    {index !== activities.length - 1 && <div style={styles.verticalLine}></div>}
                </React.Fragment>
            ))
            }
        </div >
    );
}
