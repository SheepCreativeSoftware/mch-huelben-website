<template>
	<article
		ref="article-container"
		class="article-container"
	>
		<section>
			<h3 class="section-title">
				<slot name="title">
					<!-- title -->
				</slot>
			</h3>
			<div
				v-if="$slots.text"
				class="section-text"
			>
				<slot name="text">
					<!-- text -->
				</slot>
			</div>
			<div>
				<slot name="edit">
					<!-- edit -->
				</slot>
			</div>
			<template v-if="$slots.additional">
				<slot name="additional">
				<!-- additional -->
				</slot>
			</template>
		</section>
	</article>
</template>

<script setup lang="ts">
import { onMounted, onUpdated, useTemplateRef } from 'vue';
import { searchForGoogleMapsLinks } from '../../modules/gmaps-link-consent-handler';
import { searchForYoutubeLinks } from '../../modules/youtube-link-consent-handler';

const articleContainer = useTemplateRef('article-container');

const updateThirdPartyLinks = () => {
	if (!(articleContainer.value instanceof Element)) return;
	searchForGoogleMapsLinks(articleContainer.value);
	searchForYoutubeLinks(articleContainer.value);
};

onUpdated(() => {
	updateThirdPartyLinks();
});

onMounted(() => {
	updateThirdPartyLinks();
});
</script>

<style lang="css" scoped>
.article-container {
	padding: 3rem 4vw;
	width: calc(100% - 8vw);
}

section {
	display: flex;
	flex-direction: column;
	gap: 24px;

}

h3.section-title {
	display: flex;
	flex-direction: row;

	&::after {
		content: '';
		flex: 1;
		border-bottom: 2px solid var(--primary-color-500);
		margin: auto;
		margin-left: 10px;
	}
}

.section-text {
	text-align: left;
	font-size: var(--fs-400);
}
</style>
