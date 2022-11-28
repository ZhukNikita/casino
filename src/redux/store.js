import {configureStore} from "@reduxjs/toolkit";
import {AuthReducer} from './slices/auth'


const store = configureStore({
    reducer:{
        auth: AuthReducer,
    }
})
export default store