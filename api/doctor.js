import request from '@/utils/request.js'

// 医生列表（支持不传参 → 返回全部医生）
export const getDoctors = (department_id) => {
  return request('/doctors', 'GET', { department_id })
}

// 医生详情
export const getDoctorDetail = (id) => {
  return request(`/doctors/${id}`, 'GET')
}