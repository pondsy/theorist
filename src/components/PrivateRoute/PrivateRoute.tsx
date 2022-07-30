import React from 'react';
import {useLocation, Navigate, Outlet} from 'react-router-dom';
import AuthService from "../../store/auth/authService";


const PrivateRoute = () => {
    const location = useLocation();
    const isLoggedIn = AuthService.isLoggedIn();

    return isLoggedIn ? <Outlet /> : <Navigate to="/" state={{from: location}}/>;
}

export default PrivateRoute;