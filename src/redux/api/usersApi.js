import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const usersApi = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8800/api/',
        prepareHeaders: (headers, { getState }) => {
            const token = getState().auth.token
            if (token) {
                headers.set('Authorization', `Bearer: ${token}`)
            }
            return headers
        }
    }),
    reducerPath: 'usersApi',
    tagTypes: ['Doctors', 'Patients'],
    endpoints: (builder) => ({
        getDoctors: builder.query({
            query: () => 'user/doctors',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Doctors', id })),
                        { type: 'Doctors', id: 'LIST' },
                    ]
                    : [{ type: 'Doctors', id: 'LIST' }]
        }),
        deleteDoctor: builder.mutation({
            query: (id) => ({
                url: `myPage/admin/user/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Doctors', id: 'LIST' }]
        }),
        patchDoctor: builder.mutation({
            query: (details) => ({
                url: `myPage/admin/doctor/${details.id}`,
                method: 'PATCH',
                body: details.editedDoctor
            }),
            invalidatesTags: [{ type: 'Doctors', id: 'LIST' }]
        }),
        postDoctor: builder.mutation({
            query: (newDoctor) => ({
                url: 'myPage/admin/doctor',
                method: 'POST',
                body: newDoctor
            }),
            invalidatesTags: [{ type: 'Doctors', id: 'LIST' }]
        }),
        getPatients: builder.query({
            query: () => 'user/patients',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Patients', id })),
                        { type: 'Patients', id: 'Data' },
                    ]
                    : [{ type: 'Patients', id: 'Data' }]
        }),
        deletePatient: builder.mutation({
            query: (id) => ({
                url: `myPage/admin/user/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Patients', id: 'Data' }]
        }),
        postPatient: builder.mutation({
            query: (dataPatient) =>({
                url: 'myPage/admin/patient',
                method: 'POST',
                body: dataPatient
            }),
            invalidatesTags: [{ type: 'Patients', id: 'Data' }]
        }),
        patchPatient: builder.mutation({
            query: (details) => ({
                url: `myPage/admin/patient/${details.id}`,
                method: 'PATCH',
                body: details.patchedPatient
            }),
            invalidatesTags: [{ type: 'Patients', id: 'Data' }]
        }),
    })
})
export const { useGetDoctorsQuery,
    useDeleteDoctorMutation,
    usePatchDoctorMutation,
    usePostDoctorMutation,
    useGetPatientsQuery,
    useDeletePatientMutation,
    usePostPatientMutation,
    usePatchPatientMutation
} = usersApi