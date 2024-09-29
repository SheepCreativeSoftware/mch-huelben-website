<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-1.png"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase v-if="contents.at(0)">
				<template #title>
					{{ contents.at(0)?.title }}
				</template>
				<template #text>
					<!--eslint-disable-next-line vue/no-v-html -- this is an html content-->
					<div v-html="contents.at(0)?.content" />
				</template>
				<template #additional>
					<section id="aktuelles">
						<NewsView
							:key="`${count}-${offset}`"
							:count="count"
							:offset="offset"
						/>
					</section>
				</template>
			</MainArticleBase>
			<ContainerComponent
				class="navigation-button-container"
				columns="repeat(auto-fit, minmax(min-content, 250px))"
				gap="2rem"
			>
				<ButtonLink
					:disabled="currentPage === 0"
					:target-url="{ path: '/aktuelles', query: { page: previousPage } }"
					is-button
				>
					Neuer Nachrichten
				</ButtonLink>
				<ButtonLink
					:disabled="currentPage >= lastPage"
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
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import ButtonLink from '../components/base/ButtonLink.vue';
import ContainerComponent from '../components/base/ContainerComponent.vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import NewsView from '../components/NewsView.vue';
import { routeOnError } from '../components/route-on-error';
import { useNewsStore } from '../stores/news-store';
import { usePagesStore } from '../stores/pages-store';

const pagesStore = usePagesStore();

const totalCount = computed(() => useNewsStore().totalCount);
const DEFAULT_COUNT = 10;
const count = DEFAULT_COUNT;

const lastPage = computed(() => {
	const newValue = Math.ceil(totalCount.value / count) - 1;
	return newValue < 0 ? 0 : newValue;
});

const route = useRoute();
const router = useRouter();
const technicalName = route.name;

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

<style scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
}

.navigation-button-container {
	padding: 1.5rem 4vw 5rem 4vw;
	width: calc(100% - 8vw);
	justify-content: center;

	:first-child {
		justify-self: center;
	}
	:last-child {
		justify-self: center;
	}
}

#aktuelles {
	padding-top: 50px;
}
</style>
