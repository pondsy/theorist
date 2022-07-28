import React from 'react';
import styles from './App.module.scss';
import Welcome from "./pages/Welcome";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Login from "./pages/Login";
import PrivateRoute from "./components/PrivateRoute";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                    <Route path="/login/*" element={<Login/>}/>
                    <Route path='/' element={<PrivateRoute/>}>
                        <Route path='/dashboard/*' element={<Dashboard/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
