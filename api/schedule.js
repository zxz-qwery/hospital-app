import request from '@/utils/request.js'

export const getchedules = (doctor_id) => 
	request(`/schedules?doctor_id=${doctor_id}`)