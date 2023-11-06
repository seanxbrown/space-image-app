import { useContext } from 'react'
import { Navigate, Outlet } from "react-router-dom"
import { AuthContext } from '../contexts/AuthContext'


export const PrivateRoute = ({props}: any) => {
    const user = useContext(AuthContext)

    if (user !== null){
        return <Outlet />
    } else {
        return <Navigate to="/space-image-app" />
    }
}


