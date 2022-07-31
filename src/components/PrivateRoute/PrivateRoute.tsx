import React from 'react';
import {Navigate, Outlet, useLocation} from 'react-router-dom';
import AuthService from "../../store/auth/authService";


const PrivateRoute = () => {
    const location = useLocation();
    const isLoggedIn = AuthService.isLoggedIn();

    return isLoggedIn ? <Outlet/> : <Navigate to="/" state={{from: location}}/>;
}

export default PrivateRoute;