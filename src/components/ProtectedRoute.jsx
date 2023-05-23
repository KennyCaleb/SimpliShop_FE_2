import React from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({children}) {
    const isUserExist = JSON.parse(localStorage.getItem("simplishopuser"))

    if(isUserExist){
        return children
    }
    else{
        return <Navigate to="/"/>
    }
  
}

export default ProtectedRoute