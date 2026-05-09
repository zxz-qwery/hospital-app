<template>
	<view class="page">
		<!-- 顶部Banner -->
		<view class="banner">
			<view class="banner-text">
				<view class="title">医院科室</view>
				<view class="sub">请选择需要就诊的科室</view>
			</view>
			<uv-icon name="grid-fill" size="60" color="#fff"></uv-icon>
		</view>
		<uv-loading-icon v-if="loading" text="加载科室中..."></uv-loading-icon>
		<!-- 科室列表 -->
		<view class="dept-list" v-else>
			<view class="dept-card" v-for="item in departments" :key="item.id" @click="goDoctor(item.id)">
				<!-- 左侧图标 -->
				<view class="icon">
					<uv-icon name="tags-fill" size="34" color="#4A90E2"></uv-icon>
				</view>
				<!-- 科室信息 -->
				<view class="info">
					<view class="name">
						{{item.name}}
					</view>
					<view class="desc"> 提供专业医疗服务 </view>
				</view>
				<!-- 右箭头 -->
				<uv-icon name="arrow-right" size="20" color="#999"></uv-icon>
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
		getDepartments
	} from "@/api/department.js"
	const departments = ref([])
	const loading = ref(false)
	/* 获取科室 */
	const getDepartmentList = async () => {
		loading.value = true
		const res = await getDepartments()
		if (res.code === 200) {
			departments.value = res.data
		}
		loading.value = false
	}
	/* 跳转医生列表 */
	const goDoctor = (id) => {
		uni.navigateTo({
			url: '/pages/doctor/doctor?department_id=' + id
		})
	}
	onMounted(() => {
		getDepartmentList()
	})
</script>
<style scoped>
	.page {
		background: #f5f7fb;
		min-height: 100vh;
		padding: 20rpx;
	}

	/* Banner */
	.banner {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		padding: 40rpx;
		border-radius: 20rpx;
		color: #fff;
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 30rpx;
	}

	.banner .title {
		font-size: 38rpx;
		font-weight: bold;
	}

	.banner .sub {
		font-size: 24rpx;
		opacity: .9;
		margin-top: 10rpx;
	}

	/* 科室列表 */
	.dept-list {
		display: flex;
		flex-direction: column;
		gap: 20rpx;
	}

	/* 科室卡片 */
	.dept-card {
		background: #fff;
		border-radius: 18rpx;
		padding: 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
		transition: all .2s;
	}

	/* 点击效果 */
	.dept-card:active {
		transform: scale(.97);
	}

	/* 左侧icon */
	.icon {
		width: 70rpx;
		height: 70rpx;
		border-radius: 16rpx;
		background: #e8f3ff;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20rpx;
	}

	/* 信息 */
	.info {
		flex: 1;
	}

	.name {
		font-size: 30rpx;
		font-weight: bold;
		color: #333;
	}

	.desc {
		font-size: 24rpx;
		color: #999;
		margin-top: 6rpx;
	}
</style>