<template>
	<div class="news-container">
		<article
			v-for="article in news"
			:key="article.identifier"
			class="news-item"
		>
			<h3>{{ article.title }}</h3>
			<p>{{ article.content }}</p>
			<span class="creation-date">{{ article.createdAt.toLocaleString() }}
				<span
					v-if="article.updateAt !== null"
					class="update-time"
				>
					(Aktualisiert: {{ article.updateAt.toLocaleString() }})
				</span>
			</span>
		</article>
	</div>
</template>

<script setup lang="ts">
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
