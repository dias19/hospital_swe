import { AppBar, Toolbar, Typography, Button, Stack, IconButton } from '@mui/material'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useNavigate } from 'react-router';
import { logOut } from '../../../redux/auth-slice';
import { useDispatch } from 'react-redux';
function Navbar(){
    let navigate=useNavigate()
    const dispatch=useDispatch()
    function handleClick(){
        dispatch(logOut())
        navigate('/')
    }
 return(
    <AppBar>
    <Toolbar>
        <IconButton size='large' edge='start' color='inherit' aria-label='logo' onClick={()=>navigate('/homeAdmin')}>
            <LocalHospitalIcon />
        </IconButton>
        <Typography display='flex' sx={{ flexGrow: 1 }}>
            Hospital
        </Typography>
        <Stack direction='row' spacing={2}>
            <Button color='inherit' onClick={()=> navigate('/registerUsers')}>Create user</Button>
            <Button color='inherit' onClick={()=> navigate('/departament')}>Departments</Button>
            <Button color='inherit' onClick={handleClick}>Logout</Button>
        </Stack>
    </Toolbar>
</AppBar>
 )   
}
export default Navbar
