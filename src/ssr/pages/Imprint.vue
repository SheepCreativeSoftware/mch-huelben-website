<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-3.png"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase
				v-for="content in contents"
				:key="content.identifier"
			>
				<template #title>
					{{ content.title }}
				</template>
				<template #text>
					<!--eslint-disable-next-line vue/no-v-html -- this is an html content-->
					<div v-html="content.content" />
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-1.png"
					alt="Overall Image 1"
				>
			</OverallImage>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import OverallImage from '../components/base/OverallImage.vue';
import { routeOnError } from '../components/route-on-error';
import { usePagesStore } from '../stores/pages-store';
import { useRouter } from 'vue-router';

const pagesStore = usePagesStore();
const router = useRouter();
const technicalName = router.currentRoute.value.name;

const contents = computed(() => {
	if (typeof technicalName !== 'string') return [];

	return pagesStore.getPage(technicalName);
});

const updatePages = async () => {
	try {
		if (typeof technicalName !== 'string') return;

		await pagesStore.fetchPageData(technicalName);
	} catch (error) {
		if (error instanceof Error) {
			await routeOnError(router, error);
			return;
		}
		// eslint-disable-next-line no-console -- unknown error handling
		console.error(error);
	}
};

onBeforeMount(async() => {
	await updatePages();
});
</script>

<style lang="css" scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
}
</style>
