import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const doctorApi=createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8800/api/myPage/doctor/',
        prepareHeaders:(headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer: ${token}`)
            }
            return headers
        }
    }),
    reducerPath:'doctorApi',
    endpoints: (builder)=>({
        getDoctor: builder.query({
            query: () => '/'
        })
    })
})
export const {useGetDoctorQuery}=doctorApi