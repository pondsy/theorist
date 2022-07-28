import React from 'react';
import styles from './App.module.scss';
import Welcome from "./pages/Welcome";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className={styles.app}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
