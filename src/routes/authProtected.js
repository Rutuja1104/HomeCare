import React from 'react'
import { Navigate } from 'react-router-dom'
import General from '../libs/utility/General'

const AuthProtected = ({ roles, children }) => {

    const token = General.getLocalStorageData('token')
    const role = General.getLocalStorageData('role')

    if (!token || !roles?.includes(role)) {
        return <Navigate to="/login" replace />
    }

    return children
}

const FullPageRoute = ({ children }) => {
    const token = General.getLocalStorageData('token')
    const role = General.getLocalStorageData('role')

    if (token && role !== 'admin') {        
        return <Navigate to="/nursedashboard" />
    } else if (token && role == "admin"){
        return <Navigate to="/home"/>
    } else{

        
        return children
    }
}

export { AuthProtected, FullPageRoute }