import {TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'reducer',
    storage
};

const reducers = combineReducers({
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
const presistedReducer = persistReducer(persistConfig, reducers);
const store = createStore(presistedReducer, composeWithDevTools(applyMiddleware(thunk)));
const persistor = persistStore(store);

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export { persistor, store };