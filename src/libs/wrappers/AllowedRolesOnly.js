import React from 'react'
import { isAccessAllowed } from '../hooks/userHooks'

const AllowedUsersOnly = ({ allowedRoles = [], children }) => {
    return isAccessAllowed(allowedRoles) ? children : null
}

export default AllowedUsersOnly
