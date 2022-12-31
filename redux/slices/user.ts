import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const url:string = process.env.NODE_ENV==="development" ? "http://localhost:4000/user" : "http://3.109.182.194/user"

interface IUser {
  message: string;
  data: {
    user: {
      _id:string
    };
    token: string;
  };
}

export const userApi = createApi({
  reducerPath: "user",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getUserByUsername:builder.mutation<IUser,string> ({
      query:(username)=>({
        url:`/${username}`,
        method:"GET"
      })
    }),
    login: builder.mutation<IUser, { email: string; password: string }>({
      query: ({ email, password }) => ({
        url: "/",
        method: "POST",
        body: { email, password },
      }),
    }),
    signup: builder.mutation<IUser,{ email: string; password: string; name: string; username: string }>({
      query: ({ email, password, name, username }) => ({
        url: "/create",
        method: "POST",
        body: { email, password, name, username },
      }),
    }),
  }),
});

export const { useLoginMutation, useSignupMutation ,useGetUserByUsernameMutation} = userApi;
