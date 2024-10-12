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
			<MainArticleBase>
				<template
					v-if="contents[0]"
					#title
				>
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
			<MainArticleBase>
				<template
					v-if="contents[1]"
					#title
				>
					{{ contents[1].title }}
					<button
						v-if="accessStore.isLoggedIn"
						class="edit-button"
						@click="openEditContentModal(contents[1])"
					>
						Bearbeiten
					</button>
				</template>
				<template #text>
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(contents[1].content)" />
				</template>
				<template
					v-if="contents[2]"
					#additional
				>
					<SubArticleBase>
						<template #title>
							{{ contents[2].title }}
							<button
								v-if="accessStore.isLoggedIn"
								class="edit-button"
								@click="openEditContentModal(contents[2])"
							>
								Bearbeiten
							</button>
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
					alt="Overall Image 1"
				>
			</OverallImage>
			<MainArticleBase>
				<template
					v-if="contents[3]"
					#title
				>
					{{ contents[3].title }}
					<button
						v-if="accessStore.isLoggedIn"
						class="edit-button"
						@click="openEditContentModal(contents[3])"
					>
						Bearbeiten
					</button>
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
import ContactForm from '../components/ContactForm.vue';
import EditMainContentModal from '../components/EditMainContentModal.vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import OverallImage from '../components/base/OverallImage.vue';
import { routeOnError } from '../modules/route-on-error';
import { sanitizeHtml } from '../../shared/protection/sanitize-html';
import SubArticleBase from '../components/base/SubArticleBase.vue';
import { useAccessStore } from '../stores/access-store';
import { usePagesStore } from '../stores/pages-store';
import { useRouter } from 'vue-router';

const accessStore = useAccessStore();
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
