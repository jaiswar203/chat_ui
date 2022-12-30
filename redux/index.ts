import {Action,combineReducers,configureStore,ThunkAction} from "@reduxjs/toolkit"
import utilSlice  from "./slices/util"
import { userApi } from "./slices/user"
import storage from "redux-persist/lib/storage";
import {persistReducer,persistStore} from "redux-persist";
import thunk from "redux-thunk";
import { conversation } from "./slices/conversation";
import { chat } from "./slices/chat";

const rootReducer=combineReducers({
    util:utilSlice,
    user:userApi.reducer,
    conversation:conversation.reducer,
    chat:chat.reducer
})

const persistConfig={
    key:"root",
    storage,
    blacklist:["user","conversation","chat"]
}

const persistedReducer=persistReducer(persistConfig,rootReducer)

export const store=configureStore({
    reducer: persistedReducer,
    devTools: process.env.NODE_ENV!=="production",
    middleware:[thunk,userApi.middleware,conversation.middleware,chat.middleware]
})

export const persistor=persistStore(store)

export type AppDispatch=typeof store.dispatch
export type RootState=ReturnType<typeof store.getState>
export type AppThunk<ReturnType =void>=ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>