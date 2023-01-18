import React, {useState} from 'react'
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material'
export default function ListDoctors({serviceDoctors, selectedDoctor, setSelectedDoctor}) {
 return (
    <FormControl sx={{width:'auto', marginTop:'10px'}}>
        <InputLabel id="demo-simple-select-label">Select Time Slot</InputLabel>
        <Select
            value={selectedDoctor}
            label="Select doctor"
            onChange={(e)=> setSelectedDoctor(e.target.value)}
        >
            {serviceDoctors?.map((doc, index)=>(
                <MenuItem value={doc.id} key={index}>{doc.fullName}</MenuItem>
            ))}
        </Select>
    </FormControl>
 )
}

