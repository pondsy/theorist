import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./store/store";
import {Provider} from "react-redux";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App/>
                <div id="modal"/>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
