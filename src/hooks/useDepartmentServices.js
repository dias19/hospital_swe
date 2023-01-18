import React from 'react'
import { useGetServicesQuery } from '../redux/api/serviceApi'
export default function useDepartmentServices(departmentId) {
  const {data:services=[]}=useGetServicesQuery()
  const departmentServices=services.filter(service=> service.departmentId == departmentId )
  return departmentServices
}
