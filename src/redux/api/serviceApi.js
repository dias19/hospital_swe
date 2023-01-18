import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const serviceApi=createApi({
    baseQuery: fetchBaseQuery({
        baseUrl:'http://localhost:8800/api/services',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer: ${token}`)
            }
            return headers
        }
    }),
    reducerPath:'serviceApi',
    tagTypes:['Services'],
    endpoints: (builder)=>({
        getServices: builder.query({
            query: () => '/',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Services', id })),
                        { type: 'Services', id: 'Services' },
                    ]
                    : [{ type: 'Services', id: 'Services' }]
        }),
        postService: builder.mutation({
            query: (dataService)=> ({
                url:'/',
                method:'POST',
                body:dataService
            }),
            invalidatesTags: [{type:'Services', id: 'Services'}]
        }),
        deleteService: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:[{type:'Services', id: 'Services'}]
        }),
        getService: builder.query({
            query: (id)=> `/${id}`
        })
    })
})
export const {useGetServicesQuery,
useDeleteServiceMutation,
usePostServiceMutation,
useGetServiceQuery
}=serviceApi