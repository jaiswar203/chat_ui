import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

const url:string = process.env.NODE_ENV==="development" ? "http://localhost:4000/chat" : "http://3.109.182.194/chat"

interface IChat{
    message:string,
    data:object
}

interface IGetChat{
    [key:string]:any
}

export const chat=createApi({
    reducerPath:"chat",
    baseQuery:fetchBaseQuery({
        baseUrl:url,
        prepareHeaders:(headers,{getState})=>{
            const token=(getState() as RootState).util.user.token
            headers.set(
                "Authorization",
                `Bearer ${token}`
            )
        }
    }),
    endpoints:(builder)=>({
        postChat:builder.mutation<IChat,{from:string,to:string,message:string}>({
            query:({from,to,message})=>({
                url:`/${from}/${to}`,
                method:"POST",
                body:{message}
            })
        }),
        getChat:builder.mutation<IGetChat,{from:string,to:string}>({
            query:({from,to})=>({
                url:`/${from}/${to}`,
                method:"GET"
            })
        })
    })
})

export const {usePostChatMutation}=chat