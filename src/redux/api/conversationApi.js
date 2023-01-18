import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const conversationApi=createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8800/api/messanger/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer: ${token}`)
            }
            return headers
        }
    }),
    reducerPath:'conversationApi',
    endpoints: (builder) => ({
        postConversation: builder.mutation({
            query: (usersData)=>({
                url: 'conversation/',
                method:'POST',
                body: usersData
            })
        }),
        getMessages: builder.query({
            query: (id)=> `message/${id}`
        }),
        getConversation: builder.query({
            query: ()=> `conversation/`
        })
    })
})
export const {usePostConversationMutation, useGetMessagesQuery, useGetConversationQuery}=conversationApi