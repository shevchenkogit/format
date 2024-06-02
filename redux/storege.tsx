import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {fileReducer} from "@/redux/slices/fileSlice";

const rootReducer = combineReducers({
    file: fileReducer,
})

const setUpStore = () => configureStore({
    reducer: rootReducer
})

export {
    setUpStore
}