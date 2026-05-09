<template>
	<view class="container">

		<view class="logo">
			<uv-icon name="edit-pen-fill" color="#2979ff" size="70"></uv-icon>
		</view>

		<view class="title-box">
			<text class="title">用户注册</text>
			<text class="sub">创建账号开始预约</text>
		</view>

		<view class="card">

			<uv-input v-model="username" placeholder="请输入用户名" prefixIcon="account" border="surround"></uv-input>

			<view class="gap"></view>

			<uv-input v-model="phone" placeholder="请输入手机号" prefixIcon="phone" border="surround"></uv-input>

			<view class="gap"></view>

			<uv-input v-model="password" type="password" placeholder="请输入密码" prefixIcon="lock"
				border="surround"></uv-input>

			<view class="gap"></view>

			<uv-input v-model="confirmPassword" type="password" placeholder="确认密码" prefixIcon="lock"
				border="surround"></uv-input>

			<view class="gap"></view>

			<uv-button type="primary" shape="circle" @click="register">
				注册
			</uv-button>

			<view class="bottom">
				<text>已有账号？</text>
				<text class="link" @click="goLogin">去登录</text>
			</view>

		</view>

	</view>
</template>

<script setup>
	import {
		ref
	} from "vue"
	import {
		getRegister
	} from '@/api/user.js'

	const username = ref("")
	const phone = ref("")
	const password = ref("")
	const confirmPassword = ref("")

	const register = async () => {

		if (password.value !== confirmPassword.value) {
			uni.showToast({
				title: "两次密码不一致",
				icon: "none"
			})
			return
		}

		const res = await getRegister({
			username: username.value,
			password: password.value,
			phone: phone.value,
		})

		if (res.code === 200) {
			uni.showToast({
				title: '注册成功',
				icon: 'success'
			})
			goLogin()
		} else {
			uni.showToast({
				title: res.message,
				icon: 'error'
			})
		}

	}

	const goLogin = () => {
		uni.navigateBack()
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