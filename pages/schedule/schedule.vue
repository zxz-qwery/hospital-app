<template>
	<view class="page">
		<!-- 医生信息 -->
		<view class="doctor-card">
			<uv-avatar class="avatar" size="55" :text="doctor.name ? doctor.name.slice(0,1) : '医'"
				:bgColor="getAvatarColor(doctor.name)"></uv-avatar>
			<view class="info">
				<view class="name">
					{{doctor.name}}
				</view>
				<view class="title">
					{{doctor.title}}
				</view>
				<view class="specialty"> 擅长：{{doctor.specialty || '暂无介绍'}}
				</view>
			</view>
		</view>
		<!-- 日期选择 -->
		<scroll-view scroll-x class="date-scroll">
			<view v-for="item in dateList" :key="item.date" class="date-card" :class="{active:item.date===activeDate}"
				@click="selectDate(item.date)">
				<view class="week">
					{{item.week}}
				</view>
				<view class="day">
					{{item.day}}
				</view>
			</view>
		</scroll-view>
		<!-- 排班 -->
		<view class="schedule-card" v-for="item in currentSchedules" :key="item.id">
			<!-- 时间 -->
			<view class="top">
				<view class="period">
					{{item.time_period}}
				</view>
				<view class="date">
					{{item.schedule_date}}
				</view>
			</view>
			<!-- 号源进度条 -->
			<view class="progress">
				<view class="progress-inner" :style="{
				width:(item.current_number/item.max_number*100)+'%'
				}"></view>
			</view>
			<!-- 底部 -->
			<view class="bottom">
				<view class="remain"> 剩余 {{item.max_number-item.current_number}} 号 </view>
				<uv-button type="primary" size="mini" :disabled="(item.max_number-item.current_number)==0"
					@click="appointment(item.id)">
					{{(item.max_number-item.current_number)==0?'已满':'预约'}}
				</uv-button>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted,
		computed
	} from "vue"
	import {
		createAppointment
	} from '@/api/appointment.js'
	import {
		getchedules
	} from "@/api/schedule.js"
	import {
		getDoctorDetail
	} from "@/api/doctor.js"
	import {
		createNotification
	} from '@/api/notification.js'
	const schedules = ref([])
	const doctor = ref({})
	const activeDate = ref("")
	// 根据名字生成固定头像颜色
	const getAvatarColor = (name) => {
		const colors = ['#4A90E2', '#5CC9A4', '#FF9A56', '#7263D6', '#F56F6F', '#36CFC9']
		if (!name) return colors[0]
		let index = 0
		for (let i = 0; i < name.length; i++) {
			index += name.charCodeAt(i)
		}
		return colors[index % colors.length]
	}
	/* 获取排班 */
	const getSchedules = async (id) => {
		const res = await getchedules(id)
		if (res.code == 200) {
			schedules.value = res.data
			if (res.data.length) {
				activeDate.value = res.data[0].schedule_date
			}
		}
	}
	/* 医生信息 */
	const getDoctor = async (id) => {
		const res = await getDoctorDetail(id)
		if (res.code == 200) {
			doctor.value = res.data
		}
	}
	/* 日期列表 */
	const dateList = computed(() => {
		const arr = []
		schedules.value.forEach(item => {
			if (!arr.find(d => d.date == item.schedule_date)) {
				const d = new Date(item.schedule_date)
				const weeks = ['日', '一', '二', '三', '四', '五', '六']
				arr.push({
					date: item.schedule_date,
					week: '周' + weeks[d.getDay()],
					day: item.schedule_date.slice(5)
				})
			}
		})
		return arr
	})
	/* 当前日期排班 */
	const currentSchedules = computed(() => {
		return schedules.value.filter(item => {
			return item.schedule_date == activeDate.value
		})
	})
	const selectDate = (date) => {
		activeDate.value = date
	}
	/* 预约（修复完成，不会崩溃） */
	const appointment = (id) => {
		uni.showModal({
			title: "确认预约",
			content: "确定预约该号源吗？",
			success: async (modalRes) => {
				if (!modalRes.confirm) return
				const user = uni.getStorageSync('user_info')
				if (!user || !user.id) {
					uni.showToast({
						title: "请先登录",
						icon: "none"
					})
					return
				}
				// 调用预约接口
				const apiRes = await createAppointment({
					user_id: user.id,
					doctor_id: doctor.value.id,
					schedule_id: id
				})
				if (apiRes.code === 200) {
					uni.showToast({
						title: "预约成功",
						icon: "success"
					})
					const res = await createNotification({
						user_id: user.id,
						doctor_id: doctor.value.id,
						schedule_id: id
					})
					console.log("通知", res)
					setTimeout(() => {
						uni.switchTab({
							url: '/pages/order/order'
						})
					}, 1500)
				} else {
					uni.showToast({
						title: apiRes.message || "预约失败",
						icon: "none"
					})
				}
			}
		})
	}
	/* 页面加载（防崩溃版） */
	onMounted(() => {
		const pages = getCurrentPages()
		const options = pages[pages.length - 1].options
		console.log("接收参数：", options)
		const doctor_id = options.doctor_id
		if (!doctor_id || doctor_id === "undefined") {
			uni.showToast({
				title: "医生参数异常",
				icon: "none"
			})
			return
		}
		getSchedules(doctor_id)
		getDoctor(doctor_id)
	})
</script>
<style scoped>
	.page {
		background: #f3f6fb;
		min-height: 100vh;
		padding: 20rpx;
	}

	/* 医生卡片 */
	.doctor-card {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		border-radius: 24rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		color: #fff;
		margin-bottom: 30rpx;
	}

	.avatar {
		width: 110rpx;
		height: 110rpx;
		border-radius: 50%;
		margin-right: 20rpx;
		border: 4rpx solid rgba(255, 255, 255, .4);
	}

	.name {
		font-size: 36rpx;
		font-weight: bold;
	}

	.title {
		font-size: 24rpx;
		background: rgba(255, 255, 255, .2);
		padding: 4rpx 12rpx;
		border-radius: 10rpx;
		display: inline-block;
		margin-top: 6rpx;
	}

	.specialty {
		font-size: 24rpx;
		margin-top: 6rpx;
		opacity: .9;
	}

	/* 日期选择 */
	.date-scroll {
		white-space: nowrap;
		margin-bottom: 30rpx;
	}

	.date-card {
		display: inline-block;
		width: 120rpx;
		height: 120rpx;
		background: #fff;
		border-radius: 18rpx;
		margin-right: 20rpx;
		text-align: center;
		padding-top: 20rpx;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, .05);
	}

	.week {
		font-size: 24rpx;
		color: #999;
	}

	.day {
		font-size: 34rpx;
		font-weight: bold;
		margin-top: 8rpx;
		color: #333;
	}

	.date-card.active {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		color: #fff;
	}

	.date-card.active .week {
		color: #fff;
	}

	/* 排班卡片 */
	.schedule-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 26rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, .05);
	}

	/* 顶部 */
	.top {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 12rpx;
	}

	.period {
		background: #e8f3ff;
		color: #4A90E2;
		font-size: 22rpx;
		padding: 6rpx 18rpx;
		border-radius: 30rpx;
	}

	.date {
		font-size: 24rpx;
		color: #666;
	}

	/* 进度条 */
	.progress {
		height: 12rpx;
		background: #eee;
		border-radius: 20rpx;
		margin: 18rpx 0;
	}

	.progress-inner {
		height: 100%;
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		border-radius: 20rpx;
	}

	/* 底部 */
	.bottom {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.remain {
		font-size: 26rpx;
		color: #333;
	}
</style>