import React from 'react';
import {useLocation, Navigate, Outlet} from 'react-router-dom';
import firebase from "firebase/compat/app";


const PrivateRoute = () => {
    const location = useLocation();
    const isLoggedIn = firebase.auth().currentUser;

    return isLoggedIn ? <Outlet /> : <Navigate to="/" state={{from: location}}/>;
}

export default PrivateRoute;