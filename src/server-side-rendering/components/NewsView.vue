<template>
	<div class="news-container">
		<article
			v-for="article in currentNews"
			:key="article.id"
			class="news-item"
		>
			<h3>{{ article.title }}</h3>
			<p>{{ article.text }}</p>
		</article>
		<ButtonLink
			target-url="/news"
			:is-button="true"
		>
			Weitere Nachrichten
		</ButtonLink>
	</div>
</template>

<script setup lang="ts">
import ButtonLink from './base/ButtonLink.vue';

/* eslint-disable id-length, @stylistic/max-len -- Dummy code*/
const news = [
	{
		id: 1,
		title: 'News 1',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, nunc nec vehicula ultricies, nunc nunc ultricies lectus, nec vehicula ultricies nunc nec vehicula ultricies.',
	},
	{
		id: 2,
		title: 'News 2',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, nunc nec vehicula ultricies, nunc nunc ultricies lectus, nec vehicula ultricies nunc nec vehicula ultricies.',
	},
	{
		id: 3,
		title: 'News 3',
		text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam venenatis, nunc nec vehicula ultricies, nunc nunc ultricies lectus, nec vehicula ultricies nunc nec vehicula ultricies.',
	},
];
/* eslint-enable id-length, @stylistic/max-len -- Dummy code*/

const { count } = defineProps<{
	count: number;
}>();

const currentNews = news.slice(0, count);
</script>

<style lang="css" scoped></style>
