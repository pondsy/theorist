import {TypedUseSelectorHook, useSelector } from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';
import auth from "./auth/authReducer";
import practitioner from './practitioner/practitionerReducer';
import client from "./client/clientReducer";

const persistConfig = {
    key: 'reducer',
    storage
};

const reducers = combineReducers({
    auth,
    practitioner,
    client
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const presistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(presistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { persistor, store };