import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "..";

const url:string = "http://localhost:4000/conversation";

interface IConversation{
    message:string,
    data:object
}

interface IGetConversation{
    [key:string]:any
}

export const conversation=createApi({
    reducerPath:"conversation",
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
        createConversation:builder.mutation<IConversation,{from:string,to:string}>({
            query:({from,to})=>({
                url:`/chat/${to}?chatId=${from}`,
                method:"GET"
            })
        }),
        getConversation:builder.mutation<IGetConversation,{from:string,to:string}>({
            query:({from,to})=>({
                url:`/${from}/${to}`,
                method:"GET"
            })
        }),
        
    })
})

export const {useCreateConversationMutation,useGetConversationMutation}=conversation