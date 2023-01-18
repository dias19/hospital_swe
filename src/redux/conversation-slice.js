import { createSlice } from "@reduxjs/toolkit";
import { conversationApi } from "./api/conversationApi";
export const conversationSlice = createSlice({
    name: 'conversation',
    initialState: {
    },
    reducers: {
        postMessage: (state, action) => {
            const { conversationId, message } = action.payload
            const messagesArray = state[conversationId]
            if (messagesArray) {
                messagesArray.push(message)
                console.log(messagesArray);
            }
            else {
                //no messages in conversationId
                state[conversationId] = [message]
                console.log('run');
            }
        },
        logoutState: (state) =>{
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            conversationApi.endpoints.getMessages.matchFulfilled,
            (state, {payload, meta}) => {
                const reverseMessages=payload.slice(0).reverse()
                console.log(reverseMessages);
                const conversationId=meta.arg.originalArgs
                state[conversationId]=reverseMessages
            }
        )
    }
})
export const { postMessage, logoutState} = conversationSlice.actions
export default conversationSlice.reducer