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

<script async setup lang="ts">
import { getDateFormatOptions } from '../../modules/transform/config/date-format-config';
import { useNewsStore } from '../stores/news-store';

const { count, offset } = defineProps<{
	count: number;
	offset?: number;
}>();

const news = await useNewsStore().getNews(count, offset);

</script>

<style lang="css" scoped>
.news-container {
	display: flex;
	flex-direction: column;
	gap: 25px;
}
article {
	text-align: left;
}
</style>
