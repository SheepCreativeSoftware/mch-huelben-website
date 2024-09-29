<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="headline">
				<img
					src="../assets/Heading.png"
					alt="Naturbild mit Dampflok"
				>
				<h1 class="headline-title">
					Modell<wbr>bahn<wbr>club <span>Hülben e.V.</span>
				</h1>
			</div>
		</div>
		<main>
			<MainArticleBase v-if="content.at(0)">
				<template #title>
					{{ content.at(0)?.title }}
				</template>
				<template #text>
					<!--eslint-disable-next-line vue/no-v-html -- this is an html content-->
					<div v-html="content.at(0)?.content" />
				</template>
				<template #additional>
					<ButtonLink
						target-url="/ueber"
						is-button
					>
						Über uns
					</ButtonLink>
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-1.png"
					alt="Overall Image 1"
				>
			</OverallImage>
			<MainArticleBase id="aktuelles">
				<template #title>
					Aktuelles
				</template>
				<template #additional>
					<NewsView
						:count="3"
					/>
					<ButtonLink
						target-url="/aktuelles"
						:is-button="true"
					>
						Weitere Nachrichten
					</ButtonLink>
				</template>
			</MainArticleBase>
			<MainArticleBase id="termine">
				<template #title>
					Aktuelle Termine
				</template>
				<template #text>
					<template v-if="events.length > 0">
						<table>
							<tbody>
								<tr
									v-for="event in events"
									:key="event.identifier"
								>
									<td>{{ getFormattedDate(event.fromDate, event.toDate) }}</td>
									<td>{{ event.title }}</td>
								</tr>
							</tbody>
						</table>
					</template>
					<template v-else>
						Aktuell sind keine Termine geplant.
					</template>
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-2.png"
					alt="Overall Image 2"
				>
			</OverallImage>
			<MainArticleBase
				v-if="content.at(1)"
				id="kontakt"
			>
				<template #title>
					{{ content.at(1)?.title }}
				</template>
				<template #text>
					<!--eslint-disable-next-line vue/no-v-html -- this is an html content-->
					<div v-html="content.at(1)?.content" />
				</template>
				<template #additional>
					<ContactForm />
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-3.png"
					alt="Overall Image 3"
				>
			</OverallImage>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';
import ButtonLink from '../components/base/ButtonLink.vue';
import ContactForm from '../components/ContactForm.vue';
import { getDateFormatOptions } from '../../modules/transform/config/date-format-config';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import NewsView from '../components/NewsView.vue';
import OverallImage from '../components/base/OverallImage.vue';
import { routeOnError } from '../components/route-on-error';
import { useEventsStore } from '../stores/events-store';
import { usePagesStore } from '../stores/pages-store';
import { useRouter } from 'vue-router';

const pagesStore = usePagesStore();
const eventsStore = useEventsStore();
const router = useRouter();
const technicalName = router.currentRoute.value.name;

const content = computed(() => {
	if (typeof technicalName !== 'string') return [];

	return pagesStore.getPage(technicalName);
});

const events = computed(() => eventsStore.getEvents());

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

const updateEvents = async () => {
	try {
		await eventsStore.fetchEventsData();
	} catch (error) {
		if (error instanceof Error) {
			await routeOnError(router, error);
			return;
		}
		// eslint-disable-next-line no-console -- unknown error handling
		console.error(error);
	}
};

const getFormattedDate = (fromDate: string, toDate?: string | null): string => {
	let result = new Date(fromDate).toLocaleDateString('de-DE', getDateFormatOptions());
	if (toDate) result += ` - ${new Date(toDate).toLocaleDateString('de-DE', getDateFormatOptions())}`;

	return result;
};

onBeforeMount(async() => {
	await updatePages();
	await updateEvents();
});
</script>

<style scoped>
.headline {

	text-align: center;
	z-index: 0;

	img {
		height: 100vh;
		min-width: 100%;
		object-fit: cover;
	}

	h1 {
		position: absolute;
		top: 45vh;
		left: 0;
		right: 0;
		margin: 0 var(--space-2) 0 var(--space-2);
		color: var(--bg-color-200);
		text-align: center;
		text-shadow: var(--box-shadow-lg);
		span {
			font-size: inherit;
			white-space: nowrap;
		}

		@media(width < 680px) {
			font-size: 4.5rem;
		}
		@media(prefers-color-scheme: dark) {
			color: var(--bg-color-800);
		}
	}
}

.header-container {
	position: relative;
	top: 0;
	width: 100%;
	height: 100vh;
}

#termine {
	padding-top: 0;

	table {
		width: 100%;
		border-collapse: collapse;

		td {
			padding: var(--space-100);
			border-bottom: 2px solid var(--primary-color-500);
		}
	}
}
</style>
