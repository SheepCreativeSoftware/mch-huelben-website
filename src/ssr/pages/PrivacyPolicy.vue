<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-11.jpg"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase
				v-for="content in contents"
				:key="content.identifier"
			>
				<template #title>
					{{ content.title }}
				</template>
				<template #edit>
					<EditContentModal
						:content="content"
						@update="updatePages"
					/>
				</template>
				<template #text>
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(content.content)" />
					<p>
						Letzte Aktualisierung:
						<span
							v-if="content.updatedAt"
							class="update-date"
						> {{ new Date(content.updatedAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }}

						</span>
						<span
							v-else
							class="update-date"
						> {{ new Date(content.createdAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }}

						</span>
					</p>
				</template>
			</MainArticleBase>
			<!--Settings for Cookie Managment-->
			<MainArticleBase id="cookie-einstellungen">
				<template #title>
					Cookie Datenschutz Einstellungen
				</template>
				<template #text>
					<p>
						Hier können Sie Ihre Cookie-Einstellungen für einzelne Plugins/Services anpassen.
					</p>
					<div class="cookie-settings">
						<input
							id="google-maps"
							type="checkbox"
							name="google-maps"
							:checked="cookies.googleMaps"
							@change="toggleCookie('googleMaps', $event)"
						>
						<label for="google-maps"><strong>Google Maps</strong></label>
					</div>
					<div class="cookie-settings">
						<input
							id="youtube"
							type="checkbox"
							name="youtube"
							:checked="cookies.youTube"
							@change="toggleCookie('youTube', $event)"
						>
						<label for="youtube"><strong>YouTube</strong></label>
					</div>
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-12.jpg"
					alt="Overall Image 1"
				>
			</OverallImage>
		</main>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onUpdated, reactive } from 'vue';
import { getGoogleMapsConsentCookie, toggleGmapsConsentCookie } from '../modules/gmaps-link-consent-handler';
import { getYoutubeConsentCookie, toggleYoutubeConsentCookie } from '../modules/youtube-link-consent-handler';
import EditContentModal from '../components/EditContentModal.vue';
import { getDateTimeFormatOptions } from '../../shared/transform/config/date-format-config';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import OverallImage from '../components/base/OverallImage.vue';
import { routeOnError } from '../modules/route-on-error';
import { sanitizeHtml } from '../../shared/protection/sanitize-html';
import { usePagesStore } from '../stores/pages-store';
import { useRouter } from 'vue-router';

const pagesStore = usePagesStore();
const router = useRouter();
const technicalName = router.currentRoute.value.name;

const cookies = reactive({
	googleMaps: false,
	youTube: false,
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

const toggleCookie = (cookieName: string, event: Event) => {
	if (!(event.target instanceof HTMLInputElement)) return;
	if (cookieName === 'googleMaps') {
		toggleGmapsConsentCookie(event.target.checked);
		cookies.googleMaps = event.target.checked;
	} else if (cookieName === 'youTube') {
		toggleYoutubeConsentCookie(event.target.checked);
		cookies.youTube = event.target.checked;
	}
};

onBeforeMount(async() => {
	await updatePages();
});

onMounted(() => {
	cookies.youTube = getYoutubeConsentCookie();
	cookies.googleMaps = getGoogleMapsConsentCookie();
});

onUpdated(() => {
	cookies.youTube = getYoutubeConsentCookie();
	cookies.googleMaps = getGoogleMapsConsentCookie();
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

.cookie-settings {
	display: flex;
	align-items: center;
	gap: 1rem;
}
</style>
