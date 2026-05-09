const BASE_URL = import.meta.env.VITE_BASE_URL

const request = (url, method = "GET", data = {}) => {

	const token = uni.getStorageSync('token')

	const header = {
		'Content-Type': 'application/json',
		'ngrok-skip-browser-warning': 'true'
	}

	// 只有token存在才加
	if (token) {
		header.Authorization = 'Bearer ' + token
	}

	return new Promise((resolve, reject) => {

		uni.request({
			url: BASE_URL + url,
			method: method,
			data: data,
			header: header,
			success: res => {
				resolve(res.data)
			},
			fail: err => {
				reject(err)
			}
		})

	})
}

export default request