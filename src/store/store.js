import {combineReducers, configureStore} from "@reduxjs/toolkit";
import authSlice from "../redux/authSlice";
import storage from 'redux-persist/lib/storage'
import {persistReducer} from "redux-persist";
import {setupListeners} from "@reduxjs/toolkit/query";
import videoUploadDataSlice from  '../redux/uploadDataSlice'


const persistConfig = {
    key : 'root',
    storage : storage,

}

const persistedReducer = persistReducer(
    persistConfig,authSlice
)

const reducer = combineReducers({
    auth : persistedReducer,
    upload : videoUploadDataSlice
})

const store = configureStore({
    reducer
})



setupListeners(store.dispatch)
export default store

// const store = createStore(authSlice)

// export default store;