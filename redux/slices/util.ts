import { createSlice,PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "..";


export type utilState={
    winWidth:number,
    user:{
        _id?:string
        token?:string
    },
    currentChatUser:{
        data:{
            name?:string,
            username?:string,
            _id?:string
        },
        conversation?:[]
    }
}

const initialState:utilState={
    winWidth:0,
    user:{},
    currentChatUser:{
        data:{},
        conversation:[]
    }
}


export const utilSlice=createSlice({
    name:"util",
    initialState,
    reducers:{
        setWinWidth:(state,action:PayloadAction<number>)=>{
            state.winWidth=action.payload
        },
        setUser:(state,action:PayloadAction<object>)=>{
            state.user=action.payload
        },
        setCurrentChatUser:(state,action:PayloadAction<object>)=>{
            state.currentChatUser = {...state.currentChatUser,...action.payload}
        }
    }
})


export const {setWinWidth,setUser,setCurrentChatUser}=utilSlice.actions

export const util=(state:RootState)=>state.util


export default utilSlice.reducer