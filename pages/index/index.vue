<template>
	<view class="page">
		<!-- 顶部 -->
		<view class="header">
			<view class="welcome"> 您好，祝您身体健康 </view>
			<view class="title"> 医院预约挂号 </view>
			<uv-search v-model="keyword" placeholder="搜索医生 / 医院 / 科室" bgColor="#fff" :showAction="false"></uv-search>
		</view>
		<!-- 功能入口 -->
		<view class="menu-card">
			<view class="menu-grid">
				<view class="menu-item" @click="uni.navigateTo({url:'/pages/department/department'})">
					<uv-icon name="plus-circle-fill" size="40" color="#4A90E2"></uv-icon>
					<text>预约挂号</text>
				</view>
				<view class="menu-item" @click="gotoTab('/pages/order/order')">
					<uv-icon name="calendar" size="40" color="#67C23A"></uv-icon>
					<text>我的预约</text>
				</view>
				<view class="menu-item">
					<uv-icon name="bell" size="40" color="#E6A23C"></uv-icon>
					<text>就诊提醒</text>
				</view>
				<view class="menu-item">
					<uv-icon name="file-text" size="40" color="#F56C6C"></uv-icon>
					<text>健康资讯</text>
				</view>
			</view>
		</view>
		<!-- 快捷服务 -->
		<view class="menu-card">
			<view class="menu-grid">
				<view class="menu-item" @click="uni.navigateTo({url:'/pages/department/department'})">
					<uv-icon name="grid" size="40" color="#9B59B6"></uv-icon>
					<text>科室导航</text>
				</view>
				<view class="menu-item">
					<uv-icon name="plus-circle" size="40" color="#00BCD4"></uv-icon>
					<text>智能导诊</text>
				</view>
				<view class="menu-item" @click="gotoTab('/pages/news/news')">
					<uv-icon name="chat" size="40" color="#3F51B5"></uv-icon>
					<text>消息通知</text>
				</view>
				<view class="menu-item" @click="gotoTab('/pages/my/my')">
					<uv-icon name="account" size="40" color="#FF9800"></uv-icon>
					<text>个人中心</text>
				</view>
			</view>
		</view>
		<!-- 就诊提醒 -->
		<view class="card">
			<view class="card-header">
				<text>就诊提醒</text>
				<text class="more">查看更多</text>
			</view>
			<uv-alert type="primary" title="明天 09:30 内科 张医生" description="请提前30分钟到达医院签到" :showIcon="true"></uv-alert>
		</view>
		<!-- 推荐医生 -->
		<view class="card">
			<view class="card-header">
				<text>推荐医生</text>
				<text class="more">查看更多</text>
			</view>
			<view class="doctor-list">
				<view class="doctor-card" v-for="(item,index) in doctors" :key="index" @click="goDoctorDetail(item.id)">
					<uv-avatar size="50" :text="item.name.slice(0,1)" bgColor="#4A90E2"></uv-avatar>
					<view class="doctor-info">
						<view class="doctor-name">
							{{item.name}}
						</view>
						<view class="doctor-title">
							{{item.title}}
						</view>
						<view class="doctor-tags">
							<text class="tag">专家</text>
							<text class="tag">可预约</text>
						</view>
						<view class="doctor-desc">
							{{item.introduction}}
						</view>
					</view>
					<uv-button size="mini" type="primary" shape="circle"> 预约 </uv-button>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref
	} from "vue"
	import {
		getDoctors
	} from '@/api/doctor.js'
	const keyword = ref("")
	const doctors = ref([])
	const getList = async () => {
		const res = await getDoctors()
		// 首页只显示3个推荐医生
		doctors.value = res.data.slice(0, 3)
	}
	getList()
	const gotoTab = (url) => {
		uni.switchTab({
			url
		})
	}
	const goDoctorDetail = (id) => {
		uni.navigateTo({
			url: `/pages/doctorDetail/doctorDetail?id=${id}`
		})
	}
</script>
<style scoped>
	.page {
		background: #f5f6fa;
		min-height: 100vh;
	}

	/* 顶部 */
	.header {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		padding: 60rpx 30rpx 40rpx;
		border-bottom-left-radius: 40rpx;
		border-bottom-right-radius: 40rpx;
	}

	.welcome {
		color: #ffffffcc;
		font-size: 24rpx;
		margin-bottom: 10rpx;
	}

	.title {
		color: #fff;
		font-size: 36rpx;
		font-weight: bold;
		margin-bottom: 20rpx;
	}

	/* 宫格卡片 */
	.menu-card {
		background: #fff;
		margin: 30rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.05);
	}

	.menu-grid {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		gap: 20rpx;
	}

	.menu-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
		color: #666;
		transition: all .2s;
	}

	.menu-item:active {
		transform: scale(.9);
		opacity: .8;
	}

	/* 卡片 */
	.card {
		background: #fff;
		margin: 30rpx;
		border-radius: 20rpx;
		padding: 30rpx;
		box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.05);
		position: relative;
	}

	.card::before {
		content: "";
		position: absolute;
		left: 0;
		top: 20rpx;
		width: 6rpx;
		height: 40rpx;
		background: #4A90E2;
		border-radius: 4rpx;
	}

	.card-header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20rpx;
		font-weight: bold;
	}

	.more {
		color: #999;
		font-size: 24rpx;
	}

	/* 医生 */
	.doctor-list {
		padding: 10rpx 0;
	}

	.doctor-card {
		background: #ffffff;
		border-radius: 16rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 6rpx 16rpx rgba(0, 0, 0, 0.06);
	}

	.doctor-info {
		flex: 1;
		margin-left: 20rpx;
	}

	.doctor-name {
		font-size: 30rpx;
		font-weight: bold;
	}

	.doctor-title {
		font-size: 24rpx;
		color: #409eff;
		margin-top: 6rpx;
	}

	.doctor-tags {
		margin-top: 8rpx;
	}

	.tag {
		background: #ecf5ff;
		color: #409eff;
		font-size: 20rpx;
		padding: 4rpx 12rpx;
		border-radius: 20rpx;
		margin-right: 10rpx;
	}

	.doctor-desc {
		font-size: 24rpx;
		color: #888;
		margin-top: 6rpx;
	}
</style>