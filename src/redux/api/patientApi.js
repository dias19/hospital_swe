import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'
export const patientApi=createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8800/api/myPage/patient/',
        prepareHeaders:(headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer: ${token}`)
            }
            return headers
        }
    }),
    reducerPath:'patientApi',
    endpoints: (builder)=>({
        getPatient: builder.query({
            query: () => '/'
        })
    })
})
export const {useGetPatientQuery}=patientApi
