<template>
	<view class="page">
		<!-- 顶部背景 -->
		<view class="header-bg"></view>
		<!-- 用户卡片 -->
		<view class="user-card">
			<uv-avatar size="70" :text="avatarText" :bgColor="avatarColor"></uv-avatar>
			<view class="user-info">
				<text class="name">
					{{user_info.real_name || user_info.username}}
				</text>
				<text class="phone">{{user_info.phone}}</text>
			</view>
		</view>
		<!-- 账号管理 -->
		<view class="menu-card">
			<view class="card-title">账号管理</view>
			<uv-cell-group>
				<uv-cell title="编辑资料" icon="edit-pen" isLink @click="goto('/pages/userInfo/userInfo')"></uv-cell>
				<uv-cell title="修改密码" icon="lock" isLink @click="goto('/pages/changePwd/changePwd')"></uv-cell>
			</uv-cell-group>
		</view>
		<!-- 我的服务 -->
		<view class="menu-card">
			<view class="card-title">我的服务</view>
			<uv-cell-group>
				<uv-cell title="我的预约" icon="calendar" isLink @click="gotoSwitch('/pages/order/order')"></uv-cell>
				<uv-cell title="就诊记录" icon="file-text" isLink></uv-cell>
				<uv-cell title="消息通知" icon="bell" isLink @click="gotoSwitch('/pages/news/news')"></uv-cell>
			</uv-cell-group>
		</view>
		<!-- 退出 -->
		<view class="logout-box">
			<uv-button type="error" shape="circle" size="large" @click="logout"> 退出登录 </uv-button>
		</view>
	</view>
</template>
<script setup>
	import {
		computed
	} from "vue"
	import {
		exitLayout
	} from '@/api/user.js'
	const colors = ['#4A90E2', '#5AA9FF', '#FF6B6B', '#FF9F43', '#1DD1A1', '#54A0FF', '#A29BFE', '#FD79A8']
	const avatarColor = computed(() => {
		const index = user_info.id % colors.length
		return colors[index]
	})
	const user_info = uni.getStorageSync('user_info')
	/* 头像文字 */
	const avatarText = computed(() => {
		if (user_info.real_name) {
			return user_info.real_name.substring(0, 1)
		}
		if (user_info.username) {
			return user_info.username.substring(0, 1)
		}
		return "U"
	})
	/* 跳转 */
	const goto = (url) => {
		uni.navigateTo({
			url
		})
	}
	const gotoSwitch = (url) => {
		uni.switchTab({
			url
		})
	}
	/* 退出 */
	const logout = () => {
		uni.showModal({
			title: "提示",
			content: "确定退出登录吗？",
			success: async (res) => {
				if (res.confirm) {
					const result = await exitLayout()
					if (result.code === 200) {
						uni.removeStorageSync('token')
						uni.removeStorageSync('user_info')
						uni.showToast({
							title: "已退出登录"
						})
						uni.navigateTo({
							url: '/pages/login/login'
						})
					}
				}
			}
		})
	}
</script>
<style scoped>
	.page {
		background: #f5f6fa;
		min-height: 100vh;
		padding-bottom: 40rpx;
	}

	/* 顶部背景 */
	.header-bg {
		height: 200rpx;
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
	}

	/* 用户卡片 */
	.user-card {
		background: #fff;
		margin: -80rpx 30rpx 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		display: flex;
		align-items: center;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
	}

	.user-info {
		margin-left: 20rpx;
		display: flex;
		flex-direction: column;
	}

	.name {
		font-size: 32rpx;
		font-weight: bold;
	}

	.phone {
		font-size: 24rpx;
		color: #888;
		margin-top: 8rpx;
	}

	/* 功能卡片 */
	.menu-card {
		background: #fff;
		margin: 30rpx;
		border-radius: 20rpx;
		overflow: hidden;
		box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, 0.04);
	}

	.card-title {
		padding: 20rpx 30rpx;
		font-size: 26rpx;
		font-weight: 600;
		color: #666;
	}

	/* 退出 */
	.logout-box {
		padding: 40rpx;
	}
</style>