<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<main>
			<ContainerComponent>
				<section id="aktuelles">
					<h2 class="section-title">
						Aktuelles
					</h2>
					<NewsView
						:key="`${count}-${offset}`"
						:count="count"
						:offset="offset"
					/>
				</section>
				<ButtonLink
					:disabled="offset === 0"
					:target-url="{ path: '/aktuelles', query: { offset: offsetForNext } }"
					is-button
				>
					Neuer Nachrichten
				</ButtonLink>
				<ButtonLink
					:target-url="{ path: '/aktuelles', query: { offset: offsetForPrevious } }"
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
import NewsView from '../components/NewsView.vue';
import { useRoute } from 'vue-router';

const DEFAULT_COUNT = 10;

const route = useRoute();

const count = DEFAULT_COUNT;
const offset = computed(() => {
	return route.query.offset ? Number(route.query.offset) : 0;
});

const offsetForNext = computed(() => {
	if (offset.value <= 0) return 0;
	return offset.value - count;
});

const offsetForPrevious = computed(() => {
	return offset.value + count;
});

</script>

<style scoped>
.container-component {
	padding: 75px 10%;
	width: calc(100% - 20%);
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
	font-size: 1.5em;
}
</style>
