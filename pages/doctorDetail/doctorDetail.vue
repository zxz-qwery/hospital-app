<template>
	<view>

	</view>
</template>

<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
import { getDoctorDetail } from '@/api/doctor.js'

const doctorId = ref('')
const doctor = ref({})

onLoad(async (options) => {
  doctorId.value = options.id
  await getDetail()
})

const getDetail = async () => {
  const res = await getDoctorDetail(doctorId.value)
  doctor.value = res
}
</script>

<style lang="scss">

</style>