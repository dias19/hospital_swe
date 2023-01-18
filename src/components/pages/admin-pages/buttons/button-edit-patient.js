import { IconButton} from "@mui/material"
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from "react-router";
import { useGetPatientsQuery } from "../../../../redux/api/usersApi";
function ButtonEditPatient(props){
    const idArray=[props.id]
    const {data:patients=[]}=useGetPatientsQuery()
    const editedPatient=patients.filter(patient=> idArray.includes(patient.id))
    const navigate=useNavigate()
    function handleClick(){
        navigate(`/editPatient/${props.id}`, {state:{editedPatient}})
    }
return(
    <IconButton onClick={handleClick}>
        <EditIcon color="info"/>
    </IconButton>
)
}
export default ButtonEditPatient