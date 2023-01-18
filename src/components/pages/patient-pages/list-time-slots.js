import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { useGetDoctorsMutation } from '../../../redux/api/appointmentApi'
export default function ListTimeSlots({time, getDoctors, selectedTimeSlot, setSelectedTimeSlot}) {
    const {id}=useParams()
    const moment=require('moment')
    async function handleChange(e){
        setSelectedTimeSlot(e.target.value)
        const data={
            serviceId:id,
            object:{id:id,
            time:e.target.value
            }
        }
        const response=await getDoctors(data)
    }
    return(
        <FormControl sx={{width:'auto', marginTop:'10px'}}>
        <InputLabel id="demo-simple-select-label">Select Time Slot</InputLabel>
        <Select
            value={selectedTimeSlot}
            label="Select Time Slot"
            onChange={handleChange}
        >
            {time.map((timeSlot, index)=>(
                <MenuItem value={timeSlot} key={index}>{moment(timeSlot).format('HH:mm')}</MenuItem>
            ))}
        </Select>
    </FormControl>
    )
}
