<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-7.jpg"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase v-if="contents.length === 1">
				<template #title>
					{{ contents[0].title }}
					<button
						v-if="accessStore.isLoggedIn"
						class="edit-button"
						@click="openEditContentModal(contents[0])"
					>
						Bearbeiten
					</button>
				</template>
				<template #text>
					{{ contents[0].content }}
				</template>
				<template #additional>
					<SubArticleBase
						v-for="category in galleryStore.categories"
						:key="category.identifier"
					>
						<template #title>
							{{ category.title }}
						</template>
						<template #text>
							{{ category.description }}
						</template>
						<template #additional>
							<GalleryView
								:category="category.technicalName"
								:galleries="category.galleries"
							/>
						</template>
					</SubArticleBase>
				</template>
			</MainArticleBase>
		</main>
		<EditMainContentModal
			v-if="accessStore.isLoggedIn && editContentModal.show"
			:content="editContentModal.content"
			:title="editContentModal.title"
			:identifier="editContentModal.identifier"
			@close="closeEditContentModal"
		/>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, reactive } from 'vue';
import GalleryView from '../components/GalleryView.vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import { routeOnError } from '../modules/route-on-error.ts';
import SubArticleBase from '../components/base/SubArticleBase.vue';
import { useAccessStore } from '../stores/access-store';
import { useGalleryStore } from '../stores/gallery-store.ts';
import { usePagesStore } from '../stores/pages-store.ts';
import { useRouter } from 'vue-router';

const accessStore = useAccessStore();
const pagesStore = usePagesStore();
const galleryStore = useGalleryStore();
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

const editContentModal = reactive({
	show: false,
	content: '',
	title: '',
	identifier: '',
});

const openEditContentModal = (content: { content: string; title: string; identifier: string }) => {
	editContentModal.show = true;
	editContentModal.content = content.content;
	editContentModal.title = content.title;
	editContentModal.identifier = content.identifier;
};

const closeEditContentModal = async () => {
	editContentModal.show = false;
	await updatePages();
};

onBeforeMount(async() => {
	await updatePages();
	await updateGalleries();
});
</script>

<style lang="css" scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
	max-height: 45vh;
}

.edit-button {
	margin-left: 1rem;
}
</style>
