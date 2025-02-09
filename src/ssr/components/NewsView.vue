<template>
	<div
		ref="news-container"
		class="news-container"
	>
		<AddNewsModal @update="updateNews" />
		<article
			v-for="article in news"
			:key="article.identifier"
			:class="{ 'news-item': true, 'is-active': article.isActive }"
		>
			<h3>{{ article.title }}</h3>
			<!-- eslint-disable-next-line vue/no-v-html -- this is a html content -->
			<div v-html="sanitizeHtml(article.content)" />

			<div>
				<span class="creation-date">{{ new Date(article.createdAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }}
					<span
						v-if="article.updatedAt"
						class="update-time"
					>
						(Aktualisiert: {{ new Date(article.updatedAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }})
					</span>
				</span>
				<EditNewsModal
					:content="article"
					@update="updateNews"
				/>
				<ToggleNewsArticleState
					:identifier="article.identifier"
					:is-active="article.isActive"
					@update="updateNews"
				/>
			</div>
		</article>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUpdated, useTemplateRef } from 'vue';
import AddNewsModal from './AddNewsModal.vue';
import EditNewsModal from './EditNewsModal.vue';
import { getDateTimeFormatOptions } from '../../shared/transform/config/date-format-config';
import { routeOnError } from '../modules/route-on-error';
import { sanitizeHtml } from '../../shared/protection/sanitize-html';
import { searchForGoogleMapsLinks } from '../modules/gmaps-link-consent-handler';
import { searchForYoutubeLinks } from '../modules/youtube-link-consent-handler';
import ToggleNewsArticleState from './ToggleNewsArticleState.vue';
import { useAccessStore } from '../stores/access-store';
import { useNewsStore } from '../stores/news-store';
import { useRouter } from 'vue-router';

const newsContainer = useTemplateRef('news-container');

const accessStore = useAccessStore();
const newsStore = useNewsStore();
const router = useRouter();

const props = defineProps<{
	count: number;
	offset?: number;
}>();

const currentOffset = computed(() => {
	return props.offset ?? 0;
});

const news = computed(() => {
	return newsStore.getNews(props.count);
});

const updateNews = async () => {
	try {
		await newsStore.fetchNewsData(props.count, currentOffset.value, accessStore.isLoggedIn);
	} catch (error) {
		if (error instanceof Error) {
			await routeOnError(router, error);
			return;
		}
		// eslint-disable-next-line no-console -- unknown error handling
		console.error(error);
	}
};

const updateThirdPartyLinks = () => {
	if (!(newsContainer.value instanceof Element))  return;
	searchForGoogleMapsLinks(newsContainer.value);
	searchForYoutubeLinks(newsContainer.value);
};

onBeforeMount(async() => {
	await updateNews();
});

onMounted(() => {
	updateThirdPartyLinks();
});

onUpdated(() => {
	updateThirdPartyLinks();
});
</script>

<style lang="css" scoped>
.news-container {
	display: flex;
	flex-direction: column;
	gap: var(--space-400);
}

article {
	text-align: left;
    border-radius: var(--border-radius-lg);
	box-shadow: var(--box-shadow);
    padding: 1.5rem;
    background-color: var(--bg-color-200);
}

.news-item {
	font-size: var(--fs-400) !important;
}

.news-item:not(.is-active) {
	background-color: var(--danger-color);
}

.creation-date {
	display: block;
	font-size: var(--fs-300);
	padding-top: 0.5rem;
	color: var(--bg-color-700);

	.update-time {
		font-size: var(--fs-300);
	}
}
</style>
