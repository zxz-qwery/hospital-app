<template>
	<view class="page">
		<!-- 状态 -->
		<view class="status-card">
			<uv-icon name="checkmark-circle-fill" color="#3c9cff" size="60"></uv-icon>
			<view class="right">
				<view class="status-text">预约成功</view>
				<view class="tip">请按时前往医院就诊</view>
			</view>
		</view>
		<!-- 医生信息 -->
		<view class="doctor-card">
			<uv-avatar size="70" :text="order.doctor?.name ? order.doctor?.name.slice(0,1) : '医'"
				:bgColor="getAvatarColor(order.doctor?.name)"></uv-avatar>
			<view class="doctor-info">
				<view class="name">{{order.doctor?.name}}</view>
				<view class="title">{{order.doctor?.title}}</view>
				<view class="dept">{{order.doctor?.introduction}}</view>
			</view>
		</view>
		<!-- 就诊信息 -->
		<view class="info-card">
			<view class="item">
				<text class="label">就诊日期</text>
				<text class="value">{{order.schedule?.schedule_date}}</text>
			</view>
			<view class="item">
				<text class="label">就诊时间</text>
				<text class="value">{{order.schedule?.time_period}}</text>
			</view>
			<view class="item">
				<text class="label">预约编号</text>
				<text class="value">{{order.schedule?.current_number}}</text>
			</view>
			<view class="item">
				<text class="label">预约时间</text>
				<text class="value">{{order.schedule?.created_at}}</text>
			</view>
		</view>
		<!-- 温馨提示 -->
		<view class="tip-card">
			<view class="tip-title">就诊提示</view>
			<view class="tip-text"> 1. 请提前15分钟到达医院签到 </view>
			<view class="tip-text"> 2. 如无法就诊请提前取消预约 </view>
		</view>
		<!-- 底部按钮 -->
		<view class="bottom">
			<uv-button type="error" shape="circle" size="large" @click="cancelOrder"> 取消预约 </uv-button>
		</view>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted
	} from "vue"
	import {
		getAppointmentDetail,
		cancelAppointment
	} from '@/api/appointment.js'
	const order = ref({})
	const id = ref(0)
	/* 随机头像颜色 */
	const getAvatarColor = (name) => {
		const colors = ['#4A90E2', '#5CC9A4', '#FF9A56', '#7263D6', '#F56F6F', '#36CFC9']
		if (!name) return colors[0]
		let index = 0
		for (let i = 0; i < name.length; i++) {
			index += name.charCodeAt(i)
		}
		return colors[index % colors.length]
	}
	/* 取消预约 */
	const cancelOrder = () => {
		uni.showModal({
			title: "取消预约",
			content: "确定取消该预约吗？",
			success: async res => {
				if (res.confirm) {
					const res = await cancelAppointment(id.value)
					uni.showToast({
						title: res.message,
						icon: "success"
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 1200)
				}
			}
		})
	}
	const getDetail = async (id) => {
		const res = await getAppointmentDetail(id)
		if (res.code === 200) {
			order.value = res.data
		}
		console.log(order.value)
	}
	/* 接收参数 */
	onMounted(() => {
		const pages = getCurrentPages()
		const options = pages[pages.length - 1].options
		console.log("预约详情参数", options)
		id.value = options.id
		if (id.value) {
			getDetail(id.value)
		}
	})
</script>
<style scoped>
	.page {
		background: #f5f7fb;
		min-height: 100vh;
		padding: 30rpx;
	}

	/* 状态 */
	.status-card {
		display: flex;
		background: #fff;
		border-radius: 20rpx;
		padding: 40rpx;
		text-align: center;
		margin-bottom: 25rpx;
		box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, .05);
	}

	.status-text {
		font-size: 34rpx;
		font-weight: bold;
		margin-top: 10rpx;
	}

	.tip {
		font-size: 24rpx;
		color: #888;
		margin-top: 6rpx;
	}

	/* 医生卡片 */
	.doctor-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		display: flex;
		align-items: center;
		margin-bottom: 25rpx;
		box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, .05);
	}

	.doctor-info {
		margin-left: 100rpx;
	}

	.name {
		font-size: 32rpx;
		font-weight: bold;
	}

	.right {
		margin-left: 60rpx;
	}

	.title {
		font-size: 24rpx;
		color: #666;
		margin-top: 4rpx;
	}

	.dept {
		font-size: 24rpx;
		color: #999;
		margin-top: 4rpx;
	}

	/* 信息卡片 */
	.info-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 20rpx 30rpx;
		margin-bottom: 25rpx;
		box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, .05);
	}

	.item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
		border-bottom: 1rpx solid #f0f0f0;
	}

	.item:last-child {
		border: none;
	}

	.label {
		font-size: 26rpx;
		color: #666;
	}

	.value {
		font-size: 26rpx;
		color: #333;
		font-weight: 500;
	}

	/* 提示 */
	.tip-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 6rpx 18rpx rgba(0, 0, 0, .05);
	}

	.tip-title {
		font-size: 28rpx;
		font-weight: bold;
		margin-bottom: 10rpx;
	}

	.tip-text {
		font-size: 24rpx;
		color: #777;
		margin-top: 6rpx;
	}

	/* 底部 */
	.bottom {
		position: fixed;
		left: 0;
		right: 0;
		bottom: 40rpx;
		padding: 0 40rpx;
	}
</style>