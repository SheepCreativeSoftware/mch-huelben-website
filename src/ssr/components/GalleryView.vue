<template>
	<div class="gallery-container">
		<RouterLink
			v-for="gallery in props.galleries"
			:key="gallery.identifier"
			:to="{ name: 'gallery-detail', params: { category, technicalName: gallery.page?.technicalName } }"
		>
			<section
				class="gallery-item"
			>
				<h4>{{ gallery.title }}</h4>
				<div class="section-content">
					<img
						v-if="gallery.images.length > 0"
						:src="gallery.images[0].imageUrl"
						:alt="gallery.images[0].description"
					>
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(gallery.description)" />
				</div>

				<span class="creation-date">{{ new Date(gallery.createdAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }}
					<span
						v-if="gallery.updatedAt"
						class="update-time"
					>
						(Aktualisiert: {{ new Date(gallery.updatedAt).toLocaleString('de-DE', getDateTimeFormatOptions()) }})
					</span>
				</span>
			</section>
		</RouterLink>
	</div>
</template>

<script setup lang="ts">
import type { Category } from '../stores/gallery-store.ts';
import { getDateTimeFormatOptions } from '../../shared/transform/config/date-format-config.ts';
import { sanitizeHtml } from '../../shared/protection/sanitize-html.js';

const props = defineProps<{
	category: Category[0]['technicalName'];
	galleries: Category[0]['galleries'];
}>();
</script>

<style lang="css" scoped>
.gallery-container {
	display: flex;
	flex-direction: column;
	gap: var(--space-400);

	a {
		text-decoration: none;
		color: unset;
	}
}

section {
	text-align: left;
    border-radius: var(--border-radius-lg);
	box-shadow: var(--box-shadow);
    padding: 1.5rem;
    background-color: var(--bg-color-200);
	transition: background-color 0.3s;

	&:hover {
		background-color: var(--bg-color-300);
	}
}

.section-content {
	display: grid;
	min-height: 150px;
	grid-template-columns: 1fr 2fr;
	gap: var(--space-400);

	@media(max-width: 768px) {
		grid-template-columns: 1fr;
	}

	img {
		width: 100%;
		height: 100%;
		max-height: 200px;
	}
}

.gallery-item {
	font-size: var(--fs-400) !important;

	h4 {
		margin: var(--space-100) 0;
	}
}

.creation-date {
	display: block;
	font-size: var(--fs-300);
	padding-top: 0.5rem;
	color: var(--bg-color-700);

	.update-time {
		font-size: var(--fs-300);
	}
}
</style>
