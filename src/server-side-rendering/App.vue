<template>
	<div>
		<router-view v-slot="{ Component }">
			<component :is="Component" />
		</router-view>
		<MainFooter />
	</div>
</template>

<script setup lang="ts">
import MainFooter from './components/MainFooter.vue';
</script>

<style>
</style>
