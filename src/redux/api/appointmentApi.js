import React from 'react'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
export const appointmentApi = createApi({
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
  reducerPath: 'appointmentApi',
  tagTypes: ['Appointment'],
  endpoints: (builder) => ({
    getSlots: builder.mutation({
      query: (object) => ({
        url: `services/${object.id}/appointment/Slots`,
        method: 'POST',
        body: object.day
      }),
      invalidatesTags: [{ type: 'Appointment', id: 'AppoitnmentId' }]
    }),
    getDoctors: builder.mutation({
      query: (data) => ({
        url: `services/${data.serviceId}/appointment/doctors`,
        method: 'POST',
        body: data.object
      }),
      invalidatesTags: [{ type: "Appointment", id: 'AppointmentId' }]
    }),
    createAppointment: builder.mutation({
      query: (dataObject) => ({
        url: `services/${dataObject.serviceId}/appointment`,
        method: 'POST',
        body: dataObject.body
      }),
      invalidatesTags: [{ type: "Appointment", id: 'AppointmentId' }]
    }),
    getAppointmentsPatient: builder.query({
      query: () => '/myPage/patient/appointment',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'Appointments', id })),
            { type: 'Appointments', id: 'AppointmentId' },
          ]
          : [{ type: 'Appointments', id: 'AppointmentId' }]
    }),
    getAppointmentsDoctor: builder.query({
      query: ()=> '/myPage/doctor/appointment',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'AppointmentsDoctor', id })),
            { type: 'AppointmentsDoctor', id: 'AppointmentIdDoctor' },
          ]
          : [{ type: 'AppointmentsDoctor', id: 'AppointmentIdDoctor' }]
    }),
    patchAppointmentDoctor: builder.mutation({
      query: (id) => ({
        url: `/myPage/doctor/appointment/${id}/statusChange`,
        method: 'PATCH'
      }),
      invalidatesTags:[{type:'AppointmentsDoctor', id: 'AppointmentIdDoctor'}]
    }),
    getAppointmentHistory: builder.query({
      query: () => '/myPage/patient/appointment/history',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'AppointmentsPatient', id })),
            { type: 'AppointmentsPatient', id: 'AppointmentIdPatient' },
          ]
          : [{ type: 'AppointmentsPatient', id: 'AppointmentIdPatient' }]
    })
  })
})
export const {
  useGetSlotsMutation,
  useGetDoctorsMutation,
  useCreateAppointmentMutation,
  useGetAppointmentsPatientQuery,
  useGetAppointmentsDoctorQuery,
  usePatchAppointmentDoctorMutation,
  useGetAppointmentHistoryQuery
} = appointmentApi
