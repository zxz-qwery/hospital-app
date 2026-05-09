import request from '@/utils/request.js'

// 获取通知列表
export const getNotifications = (user_id) => {
	return request(`/notifications?user_id=${user_id}`)
}

// 标记已读
export const readNotification = (id) => {
	return request(`/notifications/${id}/read`, 'PUT')
}

// 预约成功返回通知
export const createNotification = (data) => {
  return request('/appointments', 'POST', data)
}
