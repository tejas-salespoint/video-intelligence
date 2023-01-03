import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {graphqlclient} from "../index";


const initialState = {
    msg: '',
    user: '',
    token: '',
    loading: false,
    error: ""
}


const REGISTER_URL = "http://localhost:1337/api/auth/local/register";
const LOGIN_URL = "http://localhost:1337/api/auth/local";

export const signUpUser = createAsyncThunk('register', async (body) => {
    const response = await fetch(REGISTER_URL, {
        method: 'post',
        headers: {
            'Content-Type': "application/json",

        },
        body: JSON.stringify(body)


    })
    return await response.json()
})


export const signInUser = createAsyncThunk('register', async (body) => {
    const response = await fetch(LOGIN_URL, {
        method: 'post',
        headers: {
            'Content-Type': "application/json",
        },
        body: JSON.stringify(body)
    })
    return await response.json()
})


const authSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addToken: (state, action) => {
            state.token = localStorage.getItem("token")
        },
        addUser: (state, action) => {
            state.user = localStorage.getItem("user")
        },
        logout: (state, action) => {
            
            state.token = null;
            state.user = null;
            state.error = null;
            state.msg = null;
            localStorage.clear();
            graphqlclient.resetStore()
        }
    },
    extraReducers: {

        // for registration

        [signUpUser.pending]: (state, action) => {
            state.loading = true
        },
        [signUpUser.fulfilled]: (state, {payload}) => {
            state.loading = false;
            if (payload.error) {
                state.error = payload.error.message
            } else {
                state.token = payload.jwt;
                state.user = payload.user

                localStorage.setItem('user', JSON.stringify(payload.user))
                localStorage.setItem('token', payload.jwt)
            }
        },
        [signUpUser.rejected]: (state, action) => {
            state.msg = "Something went wrong Please Contact Administrator"
        },

        //    for login

        [signInUser.pending]: (state, action) => {
            state.loading = true
        },
        [signInUser.fulfilled]: (state, {payload}) => {
            state.loading = false;
            if (payload.error) {
                state.error = payload.error.message
            } else {
                state.token = payload.jwt;
                state.user = payload.user;

                localStorage.setItem('user', JSON.stringify(payload.user))
                localStorage.setItem('token', payload.jwt)
            }
        },
        [signInUser.rejected]: (state, action) => {
            state.msg = "Something went wrong Please Contact Administrator"
        },
    }


})

export const {addToken, addUser, logout} = authSlice.actions;
export default authSlice.reducer

export const selectCurrentUser = (state) => state.auth.users;
export const selectCurrentToken = (state) => state.auth.token;
