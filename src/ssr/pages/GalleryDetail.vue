<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-1.png"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase v-if="gallery !== null">
				<template #title>
					{{ gallery.title }}
				</template>
				<template #text>
					{{ gallery.description }}
				</template>
			</MainArticleBase>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import { routeOnError } from '../components/route-on-error.ts';
import { useGalleryStore } from '../stores/gallery-store.ts';
import { useRouter } from 'vue-router';

const galleryStore = useGalleryStore();
const router = useRouter();

const technicalName = router.currentRoute.value.params.technicalName;
if (typeof technicalName !== 'string') throw new Error('No technical name provided');

const gallery = computed(() => {
	return galleryStore.getGalleryByTechnicalName(technicalName);
});

const updateGalleries = async () => {
	try {
		await galleryStore.fetchGalleryData();
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
	await updateGalleries();
});
</script>

<style lang="css" scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
}
</style>
