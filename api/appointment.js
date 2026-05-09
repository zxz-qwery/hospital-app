import request from '@/utils/request.js'

// 创建预约接口
export const createAppointment  = (data) =>  request('/appointments','POST',data)

// 我的预约接口
export const getMyAppointments = (id) => request(`/my-appointments?user_id=${id}`)

// 取消预约接口
export const cancelAppointment = (id) => 
	request(`/appointments/cancel/${id}`,'POST')

// 预约详情
export const getAppointmentDetail = (id) => request(`/appointments/${id}`,'GET')