import request from '@/utils/request.js'

// 登录
export const getLogin = (data) => request("/login", "POST", data)

// 注册
export const getRegister = (data) => request("/register", "POST", data)

// 退出
export const exitLayout = () => request("/logout", "POST")

// 编辑
export const changeUser = (data) => request('/user/update-profile','POST',data)

// 修改密码
export const changePwd = (data) => request('/user/change-password','POST',data)