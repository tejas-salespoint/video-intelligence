import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    indexingProgress : '',
    video : '',
    videoId : '',
    accessToken : '',
    loading : '',
    completeProgress : '10%'
}

 export const videoUploadDataSlice = createSlice({
    name : 'upload',
    initialState,
    reducers : {
        addIndexingProgress : (state,action) => {
            
            state.indexingProgress = action.payload

        },

        addCompleteProgress : (state , action) => {
            state.completeProgress = action.payload
        },
        addVideoId : (state , action) => {
            state.videoId = action.payload
        }
        , addAccessToken : (state , action) => {
            state.accessToken = action.payload
        },
        cleanData : (state , action) => {
            state.completeProgress = ''
            state.indexingProgress = ''
}
    }
})

export const { addIndexingProgress , addCompleteProgress , addVideoId,addAccessToken} = videoUploadDataSlice.actions;

export default videoUploadDataSlice.reducer

