<template>
	<view class="page">
		<!-- 顶部统计 -->
		<view class="top-card">
			<view class="stat">
				<view class="num">{{ notifications.length }}</view>
				<view class="label">全部消息</view>
			</view>
			<view class="stat">
				<view class="num">{{ unreadCount }}</view>
				<view class="label">未读消息</view>
			</view>
		</view>
		<!-- 消息列表 -->
		<view class="message-card" v-for="item in notifications" :key="item.id" @click="read(item.id)"
			:class="{read:item.is_read==1}">
			<!-- 左侧图标 -->
			<view class="icon"> 🔔 </view>
			<!-- 内容 -->
			<view class="body">
				<view class="top">
					<view class="title">
						{{item.title}}
					</view>
					<view class="dot" v-if="item.is_read==0"></view>
				</view>
				<view class="content">
					{{item.content}}
				</view>
				<view class="time">
					{{item.created_at || '刚刚'}}
				</view>
			</view>
		</view>
		<!-- 空状态 -->
		<view class="empty" v-if="notifications.length===0"> 暂无消息 </view>
	</view>
</template>
<script setup>
	import {
		ref,
		onMounted,
		computed
	} from 'vue'
	import {
		getNotifications,
		readNotification
	} from '@/api/notification.js'
	const notifications = ref([])
	/* 获取消息 */
	const getNotificationList = async () => {
		const user = uni.getStorageSync('user_info')
		const res = await getNotifications(user.id)
		if (res.code === 200) {
			notifications.value = res.data
		}
	}
	/* 未读数量 */
	const unreadCount = computed(() => {
		return notifications.value.filter(i => i.is_read == 0).length
	})
	/* 标记已读 */
	const read = async (id) => {
		await readNotification(id)
		getNotificationList()
	}
	onMounted(() => {
		getNotificationList()
	})
</script>
<style scoped>
	.page {
		padding: 20rpx;
		background: #f5f7fb;
		min-height: 100vh;
	}

	/* 顶部统计 */
	.top-card {
		display: flex;
		justify-content: space-around;
		background: linear-gradient(135deg, #4A90E2, #5AA9FF);
		color: #fff;
		padding: 30rpx;
		border-radius: 18rpx;
		margin-bottom: 20rpx;
	}

	.stat {
		text-align: center;
	}

	.num {
		font-size: 40rpx;
		font-weight: bold;
	}

	.label {
		font-size: 24rpx;
		opacity: .9;
	}

	/* 消息卡片 */
	.message-card {
		display: flex;
		background: #fff;
		padding: 24rpx;
		border-radius: 18rpx;
		margin-bottom: 20rpx;
		box-shadow: 0 6rpx 20rpx rgba(0, 0, 0, .05);
		transition: all .2s;
	}

	.message-card:active {
		transform: scale(.98);
	}

	/* 已读样式 */
	.message-card.read {
		opacity: .6;
	}

	/* 左侧图标 */
	.icon {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		background: #e8f3ff;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 32rpx;
		margin-right: 20rpx;
	}

	/* 内容区域 */
	.body {
		flex: 1;
	}

	.top {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.title {
		font-size: 30rpx;
		font-weight: bold;
	}

	.dot {
		width: 14rpx;
		height: 14rpx;
		background: #ff4d4f;
		border-radius: 50%;
	}

	.content {
		margin-top: 10rpx;
		color: #666;
		font-size: 26rpx;
		line-height: 36rpx;
	}

	.time {
		margin-top: 12rpx;
		font-size: 22rpx;
		color: #999;
	}

	/* 空状态 */
	.empty {
		text-align: center;
		margin-top: 200rpx;
		color: #999;
		font-size: 26rpx;
	}
</style>