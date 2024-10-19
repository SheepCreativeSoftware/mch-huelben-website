<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-4.jpg"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase v-if="contents[0]">
				<template #title>
					{{ contents[0].title }}
				</template>
				<template #edit>
					<EditContentModal
						:content="contents[0]"
						@update="updatePages"
					/>
				</template>
				<template #text>
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(contents[0].content)" />
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-5.jpg"
					alt="Overall Image 1"
				>
			</OverallImage>
			<MainArticleBase v-if="contents[1]">
				<template #title>
					{{ contents[1].title }}
				</template>
				<template #edit>
					<EditContentModal
						:content="contents[1]"
						@update="updatePages"
					/>
				</template>
				<template #text>
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(contents[1].content)" />
				</template>
				<template #additional>
					<SubArticleBase>
						<template #title>
							{{ contents[2].title }}
						</template>
						<template #edit>
							<EditContentModal
								:content="contents[2]"
								@update="updatePages"
							/>
						</template>
						<template #text>
							<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
							<div v-html="sanitizeHtml(contents[2].content)" />
						</template>
					</SubArticleBase>
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-6.jpg"
					alt="Overall Image 6"
				>
			</OverallImage>
			<MainArticleBase v-if="contents[3]">
				<template #title>
					{{ contents[3].title }}
				</template>
				<template #edit>
					<EditContentModal
						:content="contents[3]"
						@update="updatePages"
					/>
				</template>
				<template #text>
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(contents[3].content)" />
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-7.jpg"
					alt="Overall Image 7"
				>
			</OverallImage>
			<MainArticleBase v-if="contents[4]">
				<template #title>
					{{ contents[4].title }}
				</template>
				<template #edit>
					<EditContentModal
						:content="contents[4]"
						@update="updatePages"
					/>
				</template>
				<template #text>
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(contents[3].content)" />
				</template>
				<template #additional>
					<ContactForm />
				</template>
			</MainArticleBase>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import ContactForm from '../components/ContactForm.vue';
import EditContentModal from '../components/EditContentModal.vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import OverallImage from '../components/base/OverallImage.vue';
import { routeOnError } from '../modules/route-on-error';
import { sanitizeHtml } from '../../shared/protection/sanitize-html';
import SubArticleBase from '../components/base/SubArticleBase.vue';
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
	max-height: 45vh;
}

.edit-button {
	margin-left: 1rem;
}
</style>
