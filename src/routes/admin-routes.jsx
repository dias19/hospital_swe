import React from 'react'
import { Route } from 'react-router'
import RequireAuth from '../components/pages/public/RequireAuth'
import RegisterUsers from '../components/authorization/register-users'
import HomePageAdmin from '../components/pages/admin-pages/home-admin-page'
import { EditInfoPatient } from '../components/pages/admin-pages/edit-info-patient'
import { EditInfoDoctor } from '../components/pages/admin-pages/edit-info-doctor'
import Department from '../components/pages/admin-pages/department'
import { DepartamentPage } from '../components/pages/admin-pages/departments-page'
import CreateDepartament from '../components/forms/create-department'
import CreateService from '../components/forms/create-service'
import EditDepartament from '../components/pages/admin-pages/edit-department'
import ServiceDetails from '../components/pages/admin-pages/service-details'
export const AdminRoutes = [
<Route element={<RequireAuth allowableRoles={['admin']} />}>
    <Route path='/registerUsers' element={<RegisterUsers />} />
    <Route path='/homeAdmin' element={<HomePageAdmin />}></Route>
    <Route path='/editPatient/:id' element={<EditInfoPatient />} />
    <Route path='/editDoctor/:id' element={<EditInfoDoctor />} />
    <Route path='/departament' element={<DepartamentPage />} />
    <Route path='/createDepartment' element={<CreateDepartament />} />
    <Route path='/department/:id' element={<Department />} />
    <Route path='/createService/:id' element={<CreateService />} />
    <Route path='/editDepartment/:id' element={<EditDepartament />} />
    <Route path='/service/:id' element={<ServiceDetails/>} />
</Route>]
