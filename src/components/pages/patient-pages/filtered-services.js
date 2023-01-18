import { Typography, Card,CardContent,CardActions, Box, Button, Container} from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { useGetServicesQuery } from '../../../redux/api/serviceApi'
export default function FilteredServices({ searched }) {
    const { data: services = [] } = useGetServicesQuery()
    const foundServices = services.filter(service => {
        if (service.service_name.toLowerCase().includes(searched.toLowerCase()))
            return service
    })
    return (
        <>
            {foundServices.length > 0
                ?
                <Box display='grid'>
                    {foundServices.map(service => (
                        <Box width='100%' >
                                <Typography variant="h5" sx={{marginTop:'10px'}}>
                                    <Link to={`/selectedService/${service.id}`}>
                                    {service.service_name}
                                    </Link>
                                </Typography>
                        </Box>
                    ))}
                </Box>
                : <Typography sx={{marginTop:'10px', marginBottom:'20px', fontSize:'16px'}}>Not found</Typography>
            }
        </>
    )
}
