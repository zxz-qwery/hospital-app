<template>
	<view class="page">
		<!-- 顶部Banner -->
		<view class="banner">
			<view>
				<view class="title">医生列表</view>
				<view class="sub">请选择需要预约的医生</view>
			</view>
			<text class="banner-icon">👨‍⚕️</text>
		</view>
		<!-- 医生列表 -->
		<view class="doctor-card" v-for="item in doctors" :key="item.id">
			<!-- 左侧头像 -->
			<uv-avatar class="avatar" size="50" :text="item.name.slice(0,1)"
				:bgColor="getAvatarColor(item.name)"></uv-avatar>
			<!-- 医生信息 -->
			<view class="info">
				<view class="name-row">
					<text class="name">
						{{item.name}}
					</text>
					<view class="tag">
						{{item.title}}
					</view>
				</view>
				<view class="department"> 📍 {{item.department_name}}
				</view>
				<view class="specialty"> 擅长：{{item.specialty || '暂无介绍'}}
				</view>
				<!-- 医生数据 -->
				<view class="stats">
					<view class="stat"> ⭐ 4.8 </view>
					<view class="stat"> 👥 1200+ </view>
				</view>
			</view>
			<!-- 按钮 -->
			<view class="action">
				<button class="btn" @click="goSchedule(item.id)"> 预约挂号 </button>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted
	} from "vue"
	import {
		getDoctors
	} from "@/api/doctor.js"
	// 头像随机颜色（根据名字生成固定颜色）
	const getAvatarColor = (name) => {
		const colors = ['#4A90E2', '#5CC9A4', '#FF9A56', '#7263D6', '#F56F6F', '#36CFC9']
		let index = 0
		for (let i = 0; i < name.length; i++) {
			index += name.charCodeAt(i)
		}
		return colors[index % colors.length]
	}
	const doctors = ref([])
	const defaultAvatar = 'https://img.yzcdn.cn/vant/cat.jpeg'
	/* 获取医生 */
	const getDoctorList = async (department_id) => {
		const res = await getDoctors(department_id)
		if (res.code === 200) {
			doctors.value = res.data
		}
	}
	/* 跳转排班 */
	const goSchedule = (id) => {
		uni.navigateTo({
			url: `/pages/schedule/schedule?doctor_id=${id}`
		})
	}
	/* 页面加载 */
	onMounted(() => {
		const pages = getCurrentPages()
		const options = pages[pages.length - 1].options
		getDoctorList(options.department_id)
	})
</script>
<style scoped>
	.page {
		background: #f5f7fb;
		min-height: 100vh;
		padding: 20rpx;
	}

	/* banner */
	.banner {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		border-radius: 20rpx;
		padding: 40rpx;
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
	}

	.title {
		font-size: 36rpx;
		font-weight: bold;
	}

	.sub {
		font-size: 24rpx;
		margin-top: 6rpx;
		opacity: .9;
	}

	.banner-icon {
		font-size: 60rpx;
	}

	/* 医生卡片 */
	.doctor-card {
		background: #fff;
		border-radius: 20rpx;
		padding: 20rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, .05);
		transition: all .2s;
	}

	.doctor-card:active {
		transform: scale(.97);
	}

	/* 头像 */
	.avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 50%;
		margin-right: 20rpx;
	}

	/* 信息 */
	.info {
		flex: 1;
	}

	.name-row {
		display: flex;
		align-items: center;
		gap: 12rpx;
	}

	.name {
		font-size: 32rpx;
		font-weight: bold;
	}

	.tag {
		background: #e8f3ff;
		color: #4A90E2;
		font-size: 22rpx;
		padding: 4rpx 10rpx;
		border-radius: 6rpx;
	}

	.department {
		font-size: 24rpx;
		color: #666;
		margin-top: 6rpx;
	}

	.specialty {
		font-size: 24rpx;
		color: #999;
		margin-top: 6rpx;
	}

	/* 数据 */
	.stats {
		display: flex;
		gap: 20rpx;
		margin-top: 10rpx;
	}

	.stat {
		font-size: 22rpx;
		color: #777;
	}

	/* 按钮 */
	.action {
		margin-left: 10rpx;
	}

	.btn {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		color: #fff;
		border: none;
		border-radius: 30rpx;
		font-size: 24rpx;
		padding: 14rpx 26rpx;
	}
</style>