import React from 'react'
import { useForm } from 'react-hook-form'
import Navbar from './admin-navbar'
import { Toolbar, Button, TextField, Box, Container } from '@mui/material'
import * as yup from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { useLocation, useNavigate, useParams } from 'react-router'
import { usePatchDepartmentMutation } from '../../../redux/api/departmentsApi'
export default function EditDepartament() {
    const { id } = useParams()
    const navigate = useNavigate()
    const { state } = useLocation()
    const [patchDepartment] = usePatchDepartmentMutation()
    const objectDepartment = state.initialDepartmentObject
    const schema = yup.object().shape({
        department_name: yup.string().required('This is required field'),
        department_info: yup.string().required('This is a required field')
    })
    const { register, handleSubmit } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            department_name: objectDepartment.department_name,
            department_info: objectDepartment.department_info
        }
    })
    async function onSubmit(data) {
        const objectDepartment = {
            id: id,
            patchedDepartment: data
        }
        const responsePatch = await patchDepartment(objectDepartment)
        console.log(responsePatch);
        navigate(-1)
    }
    return (
        <Container>
            <Navbar />
            <Toolbar />
            <Box display='flex' justifyContent='center' flexDirection='column' alignItems='center'>
                <TextField
                    label='Department Name'
                    type='text'
                    margin="normal"
                    sx={{ width: '20%' }}
                    {...register('department_name')} />
                <TextField
                    margin="normal"
                    sx={{ width: '20%' }}
                    id="outlined-multiline-static"
                    label="Department Info"
                    multiline
                    rows={4}
                    {...register('department_info')}
                />
                <Button variant="contained" color='success' onClick={handleSubmit(onSubmit)}>
                    Edit
                </Button>
            </Box>
        </Container>
    )
}
