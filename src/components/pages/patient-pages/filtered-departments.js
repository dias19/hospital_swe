import React from 'react'
import { images } from '../../../assets/images'
import { useMemo, useState} from 'react'
import { Typography, CardActionArea, CardMedia, Card, Box, Grid, CardContent } from '@mui/material'
import { useGetDepartmentsQuery } from '../../../redux/api/departmentsApi'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ListDepartmentServices from './list-department-services'
export default function FilteredDepartments({ searched }) {
    const { data: departments = [] } = useGetDepartmentsQuery()
    const [showService, setShowService]=useState(false)
    const filteredDepartments = departments.filter(department => {
        if (department.department_name.toLowerCase().includes(searched.toLowerCase()))
            return department
    })
    const randomNumbers = useMemo(() => {
        const randomNumbers = []
        for (let i = 0; i < departments.length; i++) {
            randomNumbers.push(Math.floor(Math.random() * (filteredDepartments.length + 1)))
        }
        return randomNumbers
    }, [])
    return (
        <>
            {filteredDepartments.length > 0
                ?
                    <Grid container direction='row' spacing={1} gap={1}>
                        {filteredDepartments.map((department, index) => (
                            <Grid item xs={3}>
                                <Card key={index} sx={{ height: 'auto', background: '#E0E0E3' }} >
                                    <CardMedia
                                        component="img"
                                        height="250px"
                                        image={images[randomNumbers[index]]}
                                    />
                                    <CardActionArea onClick={()=>setShowService(!showService)}>
                                        <CardContent>
                                        <Typography align='center'>
                                            {department.department_name}
                                        </Typography>
                                        <Typography align='center'>
                                            <ExpandMoreIcon />
                                        </Typography>
                                        {showService ? <ListDepartmentServices department={department}/> : null}
                                          </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                : <Typography sx={{marginTop:'10px', marginBottom:'20px', fontSize:'16px'}}> Not found</Typography>
            }
        </>
    )
}