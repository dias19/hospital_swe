import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const departmentsApi = createApi({
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
    reducerPath: 'departmentsApi',
    tagTypes: ['Departments'],
    endpoints: (builder) => ({
        getDepartments: builder.query({
            query: () => 'departments/',
            providesTags: (result) =>
                result
                    ? [
                        ...result.map(({ id }) => ({ type: 'Departments', id })),
                        { type: 'Departments', id: 'Info' },
                    ]
                    : [{ type: 'Departments', id: 'Info' }]
        }),
        postDepartment: builder.mutation({
            query: (departmentData) => ({
                url: 'departments/',
                method: 'POST',
                body: departmentData
            }),
            invalidatesTags: [{ type: 'Departments', id: 'Info' }]
        }),
        deleteDepartment: builder.mutation({
            query: (id) => ({
                url: `departments/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: [{ type: 'Departments', id: 'Info' }]
        }),
        patchDepartment: builder.mutation({
            query: (details)=>({
                url:`departments/${details.id}`,
                method:'PATCH',
                body: details.patchedDepartment
            }),
            invalidatesTags: [{ type: 'Departments', id: 'Info' }]
        })
    })
})
export const {useGetDepartmentsQuery,
    useDeleteDepartmentMutation,
    usePatchDepartmentMutation,
    usePostDepartmentMutation
}=departmentsApi