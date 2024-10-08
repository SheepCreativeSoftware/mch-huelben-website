<template>
	<HeaderNav :is-block="$route.path !== '/'" />
	<router-view
		v-slot="{ Component }"
		:class="{ 'not-home': $route.path !== '/'}"
	>
		<component :is="Component" />
	</router-view>
	<MainFooter />
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue';
import MainFooter from './components/MainFooter.vue';
import { useMetaStore } from './stores/meta-store';
import { useRouter } from 'vue-router';

const metaStore = useMetaStore();
const router = useRouter();

const updateMeta = async () => {
	try {
		let technicalName = router.currentRoute.value.name;
		if (typeof technicalName !== 'string') return;
		if (typeof router.currentRoute.value.params.technicalName === 'string') technicalName = router.currentRoute.value.params.technicalName;

		await metaStore.fetchMetaData(technicalName);
		const meta = metaStore.getMetaData(technicalName);

		if (meta) document.title = meta.title;
	} catch (error) {
		// eslint-disable-next-line no-console -- unknown error handling
		console.error(error);
	}
};

if (!import.meta.env.SSR) {
	router.afterEach(async(destinationPath, previousRoute) => {
		if (destinationPath.path === previousRoute.path) return;
		await updateMeta();
	});
}
</script>

<style lang="css" scoped>
.not-home {
	margin-top: 4rem;
}
</style>
