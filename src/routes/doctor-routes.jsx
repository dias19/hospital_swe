import { Route } from "react-router"
import HomePageDoctor from "../components/pages/doctor-pages/home-page-doctor"
import ListConversationDoctor from "../components/pages/doctor-pages/list-conversations-doctor"
import MyAppointmentDoctor from "../components/pages/doctor-pages/my-appointment-doctor"
import SendMessagesDoctor from "../components/pages/doctor-pages/send-message-doctor"
import RequireAuth from "../components/pages/public/RequireAuth"
export const DoctorRoutes = [
<Route element={<RequireAuth allowableRoles={['doctor']} />}>
    <Route path='/homeDoctor' element={<HomePageDoctor />} />,
    <Route path='/messageDoctor' element={<ListConversationDoctor/>}/>,
    <Route path='/messageDoctor/:conversationId' element={<SendMessagesDoctor/>}/>,
    <Route path='/myAppointmnetsDoctor' element={<MyAppointmentDoctor/>}/>
</Route>]