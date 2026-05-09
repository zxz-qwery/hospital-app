<template>
	<view class="page">
		<!-- 顶部 -->
		<view class="top-card">
			<view class="title">修改密码</view>
			<view class="desc">请设置新的登录密码</view>
		</view>
		<!-- 表单卡片 -->
		<view class="form-card">
			<uv-form label-width="160rpx" labelPosition="top">
				<!-- 原密码 -->
				<uv-form-item label="原密码">
					<uv-input v-model="form.old_password" :type="showOld ? 'text' : 'password'" placeholder="请输入原密码">
						<template #suffix>
							<uv-icon :name="showOld ? 'eye-fill' : 'eye-off'" size="20" @click="showOld = !showOld" />
						</template>
					</uv-input>
				</uv-form-item>
				<!-- 新密码 -->
				<uv-form-item label="新密码">
					<uv-input v-model="form.new_password" :type="showNew ? 'text' : 'password'" placeholder="请输入新密码">
						<template #suffix>
							<uv-icon :name="showNew ? 'eye-fill' : 'eye-off'" size="20" @click="showNew = !showNew" />
						</template>
					</uv-input>
				</uv-form-item>
				<!-- 确认密码 -->
				<uv-form-item label="确认密码">
					<uv-input v-model="form.confirm_password" :type="showConfirm ? 'text' : 'password'"
						placeholder="请再次输入新密码">
						<template #suffix>
							<uv-icon :name="showConfirm ? 'eye-fill' : 'eye-off'" size="20"
								@click="showConfirm = !showConfirm" />
						</template>
					</uv-input>
				</uv-form-item>
			</uv-form>
		</view>
		<!-- 保存按钮 -->
		<view class="btn-box">
			<uv-button type="primary" size="large" shape="circle" @click="submit"> 确认修改 </uv-button>
		</view>
	</view>
</template>
<script setup>
	import {
		reactive,
		ref
	} from "vue"
	import {
		changePwd
	} from '@/api/user.js'
	const showOld = ref(false)
	const showNew = ref(false)
	const showConfirm = ref(false)
	const form = reactive({
		old_password: "",
		new_password: "",
		confirm_password: ""
	})
	const submit = async () => {
		if (!form.old_password) {
			return uni.showToast({
				title: "请输入原密码",
				icon: "none"
			})
		}
		if (!form.new_password) {
			return uni.showToast({
				title: "请输入新密码",
				icon: "none"
			})
		}
		if (form.new_password.length < 6) {
			return uni.showToast({
				title: "密码至少6位",
				icon: "none"
			})
		}
		if (form.new_password !== form.confirm_password) {
			return uni.showToast({
				title: "两次密码不一致",
				icon: "none"
			})
		}
		const res = await changePwd({
			old_password: form.old_password,
			new_password: form.new_password
		})
		if(res.code === 200) {
			uni.showToast({
				title: res.message,
				icon: "success"
			})
			uni.removeStorageSync('token')
			uni.removeStorageSync('user_info')
			uni.navigateTo({
				url:'/pages/login/login'
			})
		}
		
	}
</script>
<style scoped>
	.page {
		background: #f6f7fb;
		min-height: 100vh;
		padding-bottom: 120rpx;
	}

	/* 顶部 */
	.top-card {
		background: linear-gradient(135deg, #5B8CFF, #7A9BFF);
		padding: 60rpx 40rpx 100rpx;
		color: #fff;
	}

	.title {
		font-size: 36rpx;
		font-weight: 600;
	}

	.desc {
		font-size: 24rpx;
		margin-top: 10rpx;
		opacity: 0.85;
	}

	/* 表单卡片 */
	.form-card {
		background: #fff;
		margin: -60rpx 30rpx 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 10rpx 30rpx rgba(0, 0, 0, 0.05);
	}

	/* 按钮 */
	.btn-box {
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 40rpx;
	}
</style>