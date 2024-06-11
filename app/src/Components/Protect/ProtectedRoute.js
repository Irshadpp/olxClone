import React from 'react'
import { UserAuth } from '../../context/authContext'
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({children}) => {
    const {user} = UserAuth();
    if(!user){
        <Navigate to="/login"/>
        return;
    }
    return children
}

export default ProtectedRoute
