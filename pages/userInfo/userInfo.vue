<template>
	<view class="page">
		<!-- 顶部标题卡片 -->
		<view class="top-card">
			<view class="title">编辑个人资料</view>
			<view class="desc">完善信息方便医生更好为您服务</view>
		</view>
		<!-- 表单卡片 -->
		<view class="form-card">
			<uv-form labelPosition="left" labelWidth="80">
				<!-- 用户名 -->
				<uv-form-item label="用户名">
					<uv-input v-model="form.username" disabled border="none" />
				</uv-form-item>
				<!-- 昵称 -->
				<uv-form-item label="昵称">
					<uv-input v-model="form.real_name" placeholder="请输入昵称" border="none" />
				</uv-form-item>
				<!-- 性别 -->
				<uv-form-item label="性别">
					<uv-radio-group v-model="form.gender">
						<uv-radio name="男">男</uv-radio>
						<uv-radio name="女">女</uv-radio>
					</uv-radio-group>
				</uv-form-item>
				<!-- 出生日期 -->
				<uv-form-item label="出生日期">
					<uni-datetime-picker type="date" v-model="form.birthday" :start="startDate" :end="endDate"
						:clear-icon="false" />
				</uv-form-item>
				<!-- 手机号 -->
				<uv-form-item label="手机号">
					<uv-input v-model="form.phone" type="number" placeholder="请输入手机号" border="none" />
				</uv-form-item>
			</uv-form>
		</view>
		<!-- 保存按钮 -->
		<view class="btn-box">
			<uv-button type="primary" size="large" shape="circle" @click="save"> 保存修改 </uv-button>
		</view>
	</view>
</template>
<script setup>
	import {
		reactive
	} from "vue"
	import {
		changeUser
	} from '@/api/user.js'
	import UniDatetimePicker from '@/uni_modules/uni-datetime-picker/components/uni-datetime-picker/uni-datetime-picker.vue'
	const form = reactive({
		username: "test001",
		real_name: "",
		gender: "男",
		birthday: "",
		phone: ""
	})
	const startDate = "1950-01-01"
	const endDate = "2035-12-31"
	const save = async () => {
		if (!form.real_name) {
			return uni.showToast({
				title: "请输入昵称",
				icon: "none"
			})
		}
		if (!form.phone) {
			return uni.showToast({
				title: "请输入手机号",
				icon: "none"
			})
		}
		if (!form.birthday) {
			return uni.showToast({
				title: "请选择出生日期",
				icon: "none"
			})
		}
		const res = await changeUser({
			real_name: form.real_name,
			gender: form.gender,
			birthday: form.birthday,
			phone: form.phone
		})
		console.log(res)
		if(res.code === 200) {
			uni.showToast({
				title: res.message,
				icon: "success"
			})
			uni.navigateBack()
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
		background: linear-gradient(135deg, #5B8CFF, #6FA8FF);
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
		opacity: 0.8;
	}

	/* 表单卡片 */
	.form-card {
		background: #fff;
		margin: -60rpx 30rpx 30rpx;
		padding: 30rpx;
		border-radius: 20rpx;
		box-shadow: 0 8rpx 20rpx rgba(0, 0, 0, 0.05);
	}

	/* 保存按钮 */
	.btn-box {
		position: fixed;
		left: 30rpx;
		right: 30rpx;
		bottom: 40rpx;
	}
</style>