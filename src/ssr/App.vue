<template>
	<div id="main-view-container">
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
		<MainFooter />
	</div>
</template>

<script setup lang="ts">
import MainFooter from './components/MainFooter.vue';
</script>

<style lang="css" scoped>
#main-view-container {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	min-height: 100vh;
}
</style>
