<template>
	<div class="news-container">
		<article
			v-for="article in news"
			:key="article.identifier"
			class="news-item"
		>
			<h3>{{ article.title }}</h3>
			<!-- eslint-disable-next-line vue/no-v-html -- this is a html content -->
			<div v-html="sanitizeHtml(article.content)" />
			<span class="creation-date">{{ new Date(article.createdAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }}
				<span
					v-if="article.updatedAt"
					class="update-time"
				>
					(Aktualisiert: {{ new Date(article.updatedAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }})
				</span>
			</span>
		</article>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import { getDateTimeFormatOptions } from '../../shared/transform/config/date-format-config';
import { routeOnError } from '../modules/route-on-error';
import { sanitizeHtml } from '../../shared/protection/sanitize-html';
import { useNewsStore } from '../stores/news-store';
import { useRouter } from 'vue-router';

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
		await newsStore.fetchNewsData(props.count, currentOffset.value);
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
	await updateNews();
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
