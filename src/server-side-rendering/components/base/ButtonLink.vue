<template>
	<router-link
		:class="{
			'button-link': true,
			'button-link-button': isButton ?? false,
			'button-link-inverted': hasInvertedStyle ?? false,
		}"
		:to="targetUrl"
	>
		<slot />
	</router-link>
</template>

<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router';
defineProps<{
	targetUrl: RouterLinkProps['to'];
	isButton?: boolean;
	hasInvertedStyle?: boolean;
}>();
</script>

<style scoped>
.button-link {
	color: var(--text-light);
	text-decoration: none;
	font-weight: bold;
	transition: all 0.5s ease;
	width: max-content;

	&:hover {
		text-decoration: underline;
	}
}

.button-link-button {
	color: var(--text-light);
	background-color: var(--accent-color);
	padding: 10px 24px;
	border-radius: 24px;

	&.button-link-inverted {
		color: var(--text-light);
		background-color: var(--text-dark);
	}
}

.button-link-inverted {
	color: var(--text-dark);
}

@media (prefers-color-scheme: dark) {
	.button-link {
		color: var(--text-light);
	}

	.button-link-button {
		color: var(--text-light);

		&.button-link-inverted {
			color: var(--text-light);
		}
	}

	.button-link-inverted {
		color: var(--text-dark);
	}
}
</style>

