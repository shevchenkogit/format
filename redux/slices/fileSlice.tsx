import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {ApiService} from "@/services/ApiService";
import * as FileSystem from "expo-file-system";
import {basicURL, urls} from "@/constants/urls";

const initialState = {

    fileA: [],
    format: null,
    formatResponse: null,
    downloadedFile: [],
    errors: null,
    loading: null,
    done: null
}

const downloadFile = createAsyncThunk(
    'fileSlice/downloadFile',
    async (fileName: string,rejectWithValue) =>{
        try{
            const data = await FileSystem.downloadAsync(
                basicURL + urls.download,
                FileSystem.documentDirectory + fileName,
                {
                    headers: {
                        "MyHeader": "MyValue"
                    }
                }
            );
            console.log(data)
            return data
        }catch(e){
            return console.log(rejectWithValue)
        }
    }
)

const changeFormat = createAsyncThunk(
    'fileSlice/changeFormat',
    async (format: string,rejectWithValue) =>{
        try{
            const {data} = await ApiService.changeFormat(format)
            return data
        }catch(e){
            return console.log(rejectWithValue)
        }
    }
)
const uploadFile = createAsyncThunk(
    'fileSlice/uploadFile',
    async (file: any,rejectWithValue) =>{
        try{
            const { data } = await ApiService.uploadFile(file)
            console.log(data);
            return data
        }catch(e){
            return console.log(rejectWithValue)
        }
    }
)

const deleteFile = createAsyncThunk(
    'fileSlice/deleteFile',
    async (_,rejectWithValue) =>{
        try{
            const { data } = await ApiService.delete()
            console.log(data);
        }catch(e){
            return console.log(rejectWithValue)
        }
    }
)

const fileSlice = createSlice({
    name: 'fileSlice',
    initialState,

    reducers:{
        requestFile:(state,action)=>
            void(state.fileA = action.payload),
        choiceFormat:(state,action)=>
            void(state.format = action.payload),
        done:(state,action)=>
            void(state.done = action.payload),
        formResp:(state,action)=>
            void(state.formatResponse = action.payload),
    },

    extraReducers:builder => builder
        .addCase(changeFormat.fulfilled,(state, action)=>{
            state.formatResponse = action.payload})

})

const {reducer,
    actions:{formResp ,done ,requestFile, choiceFormat}} = fileSlice

const fileReducer = fileSlice.reducer

const fileActions = {
    changeFormat,
    uploadFile,
    downloadFile,
    deleteFile,
    requestFile,
    choiceFormat,
    done,
    formResp
}

export {
    fileReducer,
    fileActions
}