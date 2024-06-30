import React from 'react'

import Icons from '../icon/Icon'
import Button from '../button/Button'
import Heading from '../heading/Heading'

import { VEC_ICON_NAME } from '../icon/constants'
import { HEADING } from '../heading/constants/constants'
import { BUTTON_TYPE } from '../../libs/constant'

const ImageWithDescription = ({ iconName = VEC_ICON_NAME.INTERVIEW_ICON, content = "Schedule an interview according to the availability", onClickCb = () => { }, buttonTitle = "", className = "",children,showImage=true , buttonVisibility=false}) => {
    return (
        <div className={`image-with-description-container ${className}`} >
            {showImage && <Icons iconName={iconName} />}
            <Heading type={HEADING.H2} customStyle={{ color: "var(--grey-60, var(--grey-60, #8F8F8F))" }}>{content}</Heading>
            {buttonTitle ? <Button type={BUTTON_TYPE.PRIMARY_LIGHT_WITH_BORDER} onClickCb={onClickCb} disabled={buttonVisibility}>{buttonTitle}</Button> : ''}
            {children}
        </div>
    )
}

export default ImageWithDescription
