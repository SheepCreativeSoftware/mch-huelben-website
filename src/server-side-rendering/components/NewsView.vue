<template>
	<div class="news-container">
		<article
			v-for="article in news"
			:key="article.identifier"
			class="news-item"
		>
			<h3>{{ article.title }}</h3>
			<p>{{ article.content }}</p>
			<span class="creation-date">{{ article.createdAt.toLocaleString('de-DE', getDateFormatOptions()) }}
				<span
					v-if="article.updateAt"
					class="update-time"
				>
					(Aktualisiert: {{ article.updateAt.toLocaleString('de-DE', getDateFormatOptions()) }})
				</span>
			</span>
		</article>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onServerPrefetch, ref } from 'vue';
import { type News, useNewsStore } from '../stores/news-store';
import { getDateFormatOptions } from '../../modules/transform/config/date-format-config';

const props = defineProps<{
	count: number;
	offset?: number;
}>();

const news = ref<News['news']>([]);

const currentOffset = computed(() => {
	return props.offset ?? 0;
});

const updateNews = () => {
	useNewsStore().getNews(props.count, currentOffset.value).then((newsData) => {
		news.value = newsData;
	}).catch((error: unknown) => {
		// eslint-disable-next-line no-console -- error handling
		console.error(error);
	});
};

onServerPrefetch(() => {
	updateNews();
});

onMounted(() => {
	updateNews();
});
</script>

<style lang="css" scoped>
.news-container {
	display: flex;
	flex-direction: column;
	gap: 25px;
}
article {
	text-align: left;
	/* border: 1px solid grey; */
    border-radius: 16px;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    padding: 24px;
    background-color: #fcfcff;

	@media(prefers-color-scheme: dark) {
		background-color: #1a1a1a;
	}
}

.creation-date {
	display: block;
	font-size: 1rem;
	padding-top: 0.5rem;

	.update-time {
		font-size: 1rem;
	}
}
</style>
