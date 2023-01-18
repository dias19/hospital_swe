import { Route } from "react-router"
import RequireAuth from "../components/pages/public/RequireAuth"
import HomePagePatient from "../components/pages/patient-pages/home-page-patient"
import SelectedService from "../components/pages/patient-pages/selected-service"
import MyAppointments from "../components/pages/patient-pages/my-appointments"
import SearchResult from "../components/pages/patient-pages/search-results"
import MessagesPatient from "../components/pages/patient-pages/messages-patient"
import ListConversationsPatient from "../components/pages/patient-pages/list-conversations-patient"
export const PatientRoutes = [
    <Route element={<RequireAuth allowableRoles={['patient']} />}>
        <Route path='/homePatient' element={<HomePagePatient />}/>
        <Route path='/search' element={<SearchResult/>}/>
        <Route path='/selectedService/:id' element={<SelectedService />} />,
        <Route path='/messages' element={<ListConversationsPatient/>}/>,
        <Route path='/messages/:conversationId' element={<MessagesPatient/>}/>
        <Route path='/myAppointments' element={<MyAppointments />} />
    </Route>]