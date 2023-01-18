import React from 'react'
import { createSlice } from '@reduxjs/toolkit'
import { getBottomNavigationActionUtilityClass } from '@mui/material'

export const authSlice = createSlice({
    name:'auth',
    initialState:{role:null, token: null},
    reducers:{
        setCredentials: (state,action) =>{
            const {role, token}=action.payload
            state.role=role
            state.token=token
        },
        logOut: (state)=>{
            state.role=null
            state.token=null
        }
    }
})
export const {setCredentials, logOut}=authSlice.actions
export default authSlice.reducer 