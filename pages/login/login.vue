<template>
	<view class="container">
		<!-- 图标 -->
		<view class="logo">
			<uv-icon name="plus-circle-fill" color="#2979ff" size="70"></uv-icon>
		</view>
		<!-- 标题 -->
		<view class="title-box">
			<text class="title">医院预约挂号</text>
			<text class="sub">便捷就医，从这里开始</text>
		</view>
		<!-- 登录卡片 -->
		<view class="card">
			<uv-input v-model="username" placeholder="请输入用户名" prefixIcon="account" border="surround"></uv-input>
			<view class="gap"></view>
			<uv-input v-model="password" type="password" placeholder="请输入密码" prefixIcon="lock"
				border="surround"></uv-input>
			<view class="gap"></view>
			<uv-button type="primary" shape="circle" @click="login"> 登录 </uv-button>
			<view class="bottom">
				<text>没有账号？</text>
				<text class="link" @click="goRegister">立即注册</text>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		ref
	} from "vue"
	import {
		getLogin
	} from '@/api/user.js'
	const username = ref("")
	const password = ref("")
	const login = async () => {
		if (!username.value || !password.value) {
			uni.showToast({
				title: "请输入账号密码",
				icon: "none"
			})
			return
		}
		console.log(username.value, password.value)
		// 登录接口
		const res = await getLogin({
			username: username.value,
			password: password.value
		})
		if (res.code === 200) {
			uni.setStorageSync('token', res.token)
			uni.setStorageSync('user_info', res.data)
			uni.showToast({
				title: '登录成功',
				icon: 'success'
			})
			uni.switchTab({
				url: "/pages/index/index"
			})
		} else {
			uni.showToast({
				title: res.message,
				icon: 'error'
			})
		}
	}
	const goRegister = () => {
		uni.navigateTo({
			url: "/pages/register/register"
		})
	}
</script>
<style scoped>
	.container {
		background: #f5f6fa;
		min-height: 100vh;
		padding: 60rpx;
		box-sizing: border-box;
	}

	.logo {
		display: flex;
		justify-content: center;
		margin-top: 120rpx;
	}

	.title-box {
		text-align: center;
		margin-top: 20rpx;
		margin-bottom: 60rpx;
	}

	.title {
		font-size: 40rpx;
		font-weight: bold;
	}

	.sub {
		display: block;
		color: #888;
		margin-top: 10rpx;
	}

	.card {
		background: #fff;
		padding: 40rpx;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
	}

	.gap {
		height: 30rpx;
	}

	.bottom {
		text-align: center;
		margin-top: 30rpx;
		font-size: 26rpx;
	}

	.link {
		color: #2979ff;
		margin-left: 10rpx;
	}
</style>