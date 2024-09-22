<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<HeaderNav :is-block="true" />
			<div class="head-image">
				<img
					src="../assets/overall/overall-1.png"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<ContainerComponent
				class="news-section-container"
			>
				<section>
					<h2 class="section-title">
						Aktuelles rund um den Verein
					</h2>
					<div class="section-text">
						Hier werden wir in unregelmässigen abständen Neuigkeiten veröffentlicht.
					</div>
				</section>
				<section id="aktuelles">
					<NewsView
						:key="`${count}-${offset}`"
						:count="count"
						:offset="offset"
					/>
				</section>
			</ContainerComponent>
			<ContainerComponent
				class="navigation-button-container"
				columns="1fr 1fr"
				justify="center"
				gap="32px"
			>
				<ButtonLink
					:disabled="currentPage === 0"
					:target-url="{ path: '/aktuelles', query: { page: previousPage } }"
					is-button
				>
					Neuer Nachrichten
				</ButtonLink>
				<ButtonLink
					:disabled="currentPage === lastPage"
					:target-url="{ path: '/aktuelles', query: { page: nextPage } }"
					is-button
				>
					Ältere Nachrichten
				</ButtonLink>
			</ContainerComponent>
		</main>
	</div>
</template>

<script setup lang="ts">
import ButtonLink from '../components/base/ButtonLink.vue';
import { computed } from 'vue';
import ContainerComponent from '../components/base/ContainerComponent.vue';
import HeaderNav from '../components/HeaderNav.vue';
import NewsView from '../components/NewsView.vue';
import { useNewsStore } from '../stores/news-store';
import { useRoute } from 'vue-router';

const totalCount = computed(() => useNewsStore().totalCount);
const DEFAULT_COUNT = 10;
const count = DEFAULT_COUNT;

const lastPage = computed(() => {
	const newValue = Math.floor(totalCount.value / count) - 1;
	return newValue < 0 ? 0 : newValue;
});

const route = useRoute();

const currentPage = computed(() => {
	const page = Number(route.query.page);
	if (!page || page <= 0) return 0;
	return page;
});

const offset = computed(() => {
	if (currentPage.value <= 0) return 0;
	return currentPage.value * count;
});

const nextPage = computed(() => {
	if (offset.value + count >= totalCount.value
		|| currentPage.value >= lastPage.value
	) return lastPage.value;
	return currentPage.value + 1;
});

const previousPage = computed(() => {
	if (offset.value <= 0) return 0;
	return currentPage.value - 1;
});
</script>

<style scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
}

.news-section-container {
	padding: 75px 10% 24px 10%;
	width: calc(100% - 20%);
}

.navigation-button-container {
	padding: 24px 10% 75px 10%;
	width: calc(100% - 20%);

	:first-child {
		justify-self: end;
	}
	:last-child {
		justify-self: start;
	}
}

#aktuelles {
	padding-top: 50px;
}

section {
	display: flex;
	flex-direction: column;
	gap: 24px;
}

h2.section-title {
	display: flex;
	flex-direction: row;

	&::after {
		content: '';
		flex: 1;
		border-bottom: 2px solid var(--accent-color);
		margin: auto;
		margin-left: 10px;
	}
}

.section-text {
	text-align: left;
	font-size: 1.5rem;
}
</style>
