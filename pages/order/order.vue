<template>
	<view class="page">
		<!-- 顶部统计 -->
		<view class="top-card">
			<view class="stat">
				<view class="num">{{list.length}}</view>
				<view class="label">我的预约</view>
			</view>
		</view>
		<!-- 状态标签 -->
		<view class="tabs">
			<view class="tab-item" :class="{active:current===index}" v-for="(item,index) in tabList" :key="index"
				@click="tabChange({index})">
				{{item.name}}
			</view>
		</view>
		<!-- 预约列表 -->
		<view class="list">
			<view class="card" v-for="item in filterList" :key="item.id">
				<!-- 医生信息 -->
				<view class="doctor">
					<view class="avatar" :style="{backgroundColor:getAvatarColor(item.doctor?.name||'医生')}">
						{{item.doctor?.name?.charAt(0)||'医'}}
					</view>
					<view class="doctor-info">
						<view class="name">
							{{item.doctor?.name || '未知医生'}}
						</view>
						<view class="dept">
							{{item.doctor?.department_name}}
						</view>
						<view class="title-tag">
							{{item.doctor?.title}}
						</view>
					</view>
					<view class="status" :class="statusColor(item.status)">
						{{statusText(item.status)}}
					</view>
				</view>
				<!-- 预约信息 -->
				<view class="info">
					<view class="info-item">
						<text class="label">预约日期</text>
						<text class="value">
							{{item.schedule.schedule_date}}
						</text>
					</view>
					<view class="info-item">
						<text class="label">预约时段</text>
						<text class="value">
							{{item.schedule.time_period}}
						</text>
					</view>
					<view class="info-item">
						<text class="label">排队号</text>
						<text class="value">
							{{item.schedule.current_number || '-'}}
						</text>
					</view>
				</view>
				<!-- 按钮 -->
				<view class="btn-box">
					<button class="btn-detail" @click="viewDetail(item.id)"> 查看详情 </button>
				</view>
			</view>
		</view>
	</view>
</template>
<script setup>
	import {
		getMyAppointments
	} from '@/api/appointment.js'
	import {
		onShow
	} from '@dcloudio/uni-app'
	import {
		ref,
		computed
	} from "vue"
	const current = ref(0)
	const tabList = [{
		name: "全部"
	}, {
		name: "待就诊"
	}, {
		name: "就诊中"
	}, {
		name: "已完成"
	}, {
		name: "已取消"
	}]
	/* 头像颜色稳定生成 */
	const getAvatarColor = (name) => {
		const colors = ['#4A90E2', '#5CC9A4', '#FF9A56', '#7263D6', '#F56F6F', '#36CFC9']
		let index = 0
		for (let i = 0; i < name.length; i++) {
			index += name.charCodeAt(i)
		}
		return colors[index % colors.length]
	}
	/* 预约列表 */
	const list = ref([])
	const getList = async () => {
		const user = uni.getStorageSync('user_info')
		const res = await getMyAppointments(user.id)
		if (res.code === 200) {
			list.value = res.data
		}
	}
	onShow(() => {
		getList()
	})
	/* 切换标签 */
	const tabChange = (e) => {
		current.value = e.index
	}
	/* 筛选 */
	const filterList = computed(() => {
		if (current.value === 0) return list.value
		const statusMap = ['', '待就诊', '就诊中', '已完成', '已取消']
		const target = statusMap[current.value]
		return list.value.filter(item => item.status === target)
	})
	/* 状态文字 */
	const statusText = (status) => {
		return status
	}
	/* 状态颜色 */
	const statusColor = (status) => {
		switch (status) {
			case '待就诊':
				return 'warning'
			case '就诊中':
				return 'primary'
			case '已完成':
				return 'success'
			case '已取消':
				return 'error'
			default:
				return 'primary'
		}
	}
	/* 查看详情 */
	const viewDetail = (id) => {
		uni.navigateTo({
			url: "/pages/orderDetail/orderDetail?id=" + id
		})
	}
</script>
<style scoped>
	.page {
		background: #f5f6fa;
		min-height: 100vh;
	}

	/* 顶部统计 */
	.top-card {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		padding: 40rpx;
		color: #fff;
		text-align: center;
	}

	.num {
		font-size: 50rpx;
		font-weight: bold;
	}

	.label {
		font-size: 24rpx;
		opacity: .9;
	}

	/* 标签 */
	.tabs {
		display: flex;
		padding: 20rpx;
		gap: 20rpx;
		background: #fff;
		overflow-x: auto;
	}

	.tab-item {
		padding: 10rpx 26rpx;
		border-radius: 40rpx;
		background: #f2f3f5;
		font-size: 26rpx;
		color: #666;
		white-space: nowrap;
	}

	.tab-item.active {
		background: #4A90E2;
		color: #fff;
	}

	/* 列表 */
	.list {
		padding: 20rpx;
	}

	/* 卡片 */
	.card {
		background: #fff;
		border-radius: 20rpx;
		padding: 24rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 8rpx 24rpx rgba(0, 0, 0, 0.05);
	}

	/* 医生 */
	.doctor {
		display: flex;
		align-items: center;
		position: relative;
	}

	.avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 50%;
		color: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
	}

	.doctor-info {
		margin-left: 20rpx;
	}

	.name {
		font-size: 30rpx;
		font-weight: bold;
	}

	.dept {
		font-size: 24rpx;
		color: #888;
		margin-top: 4rpx;
	}

	.title-tag {
		background: #e8f3ff;
		color: #4A90E2;
		font-size: 20rpx;
		padding: 4rpx 10rpx;
		border-radius: 8rpx;
		display: inline-block;
		margin-top: 6rpx;
	}

	/* 状态 */
	.status {
		position: absolute;
		right: 0;
		top: 0;
		font-size: 22rpx;
		padding: 6rpx 16rpx;
		border-radius: 20rpx;
		color: #fff;
	}

	.status.warning {
		background: #FF9500
	}

	.status.primary {
		background: #4A90E2
	}

	.status.success {
		background: #00C48C
	}

	.status.error {
		background: #FF3B30
	}

	/* 信息 */
	.info {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
		background: #f7f8fa;
		padding: 16rpx;
		border-radius: 12rpx;
	}

	.info-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 24rpx;
	}

	.label {
		color: #888;
	}

	.value {
		font-weight: bold;
		margin-top: 6rpx;
	}

	/* 按钮 */
	.btn-box {
		margin-top: 20rpx;
	}

	.btn-detail {
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		color: #fff;
		border: none;
		border-radius: 40rpx;
		font-size: 26rpx;
		width: 100%;
	}
</style>