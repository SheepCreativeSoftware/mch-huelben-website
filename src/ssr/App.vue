<template>
	<div>
		<HeaderNav :is-block="$route.path !== '/'" />
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
		<MainFooter />
	</div>
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<style lang="css" scoped>
</style>
