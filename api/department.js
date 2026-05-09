import request from '@/utils/request.js'

// 科室列表
export const getDepartments = () => request("/departments")

// 科室详情
export const getDepartmentsDetail = (id) => request(`/departments/${id}`)