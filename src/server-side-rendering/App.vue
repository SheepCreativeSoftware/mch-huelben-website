<template>
	<div>
		<router-view v-slot="{ Component }">
			<Suspense>
				<div>
					<component :is="Component" />
				</div>
			</Suspense>
		</router-view>
		<MainFooter />
	</div>
</template>

<script setup lang="ts">
import MainFooter from './components/MainFooter.vue';
</script>

<style>
</style>
