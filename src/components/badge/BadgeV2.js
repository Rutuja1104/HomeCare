import React from 'react'
import { Badge } from 'reactstrap'

const BadgeV2 = ({ children, color = "primary" }) => {
    return (
        <Badge color={color}>{children}</Badge>
    )
}

export default BadgeV2
