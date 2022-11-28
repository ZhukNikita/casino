import axios from "../../axios";
import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";


export const fetchAuth = createAsyncThunk('/auth/FetchAuth' , async(params)=>{
    const {data} = await axios.post('/auth/login' , params)
    return data
})

export const fetchRegister= createAsyncThunk('/auth/FetchRegister' , async(params)=>{
    const {data} = await axios.post('/auth/register' , params)
    return data
})
export const fetchAuthMe = createAsyncThunk('/auth/fetchAuthMe' , async ()=>{
    const { data } = await axios.get('/auth/me')
    return data;
})


const initialState = {
    data : null,
    status : 'loading'
};


const AuthSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{
        logout: state => {
            state.data = null
        }
    },
    extraReducers:{
        // Login

        [fetchAuth.pending]: (state)=>{
            state.data = null
            state.status = 'loading'
        },
        [fetchAuth.fulfilled]: (state , action)=>{
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchAuth.rejected]: (state)=>{
            state.data = null
            state.status = 'error'
        },

        //Register

        [fetchRegister.pending]: (state)=>{
            state.data = null
            state.status = 'loading'
        },
        [fetchRegister.fulfilled]: (state , action)=>{
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchRegister.rejected]: (state)=>{
            state.data = null
            state.status = 'error'
        },
        // data
        [fetchAuthMe.pending]: (state)=>{
            state.data = null
            state.status = 'loading'
        },
        [fetchAuthMe.fulfilled]: (state , action)=>{
            state.data = action.payload
            state.status = 'loaded'
        },
        [fetchAuthMe.rejected]: (state)=>{
            state.data = null
            state.status = 'error'
        },
    }
})
export const selectIsAuth = state => Boolean(state.auth.data)
export const {logout} = AuthSlice.actions
export const AuthReducer = AuthSlice.reducer