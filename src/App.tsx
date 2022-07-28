import React from 'react';
import './App.css';
import Welcome from "./pages/Welcome";
import {BrowserRouter, Route, Routes} from "react-router-dom";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Welcome/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
