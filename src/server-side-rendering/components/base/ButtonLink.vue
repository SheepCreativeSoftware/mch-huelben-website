<template>
	<router-link
		v-if="!disabled"
		:class="{
			'disabled': disabled,
			'button-link': true,
			'button-link-button': isButton ?? false,
			'button-link-inverted': hasInvertedStyle ?? false,
		}"
		:to="targetUrl"
	>
		<slot />
	</router-link>
	<a
		v-else
		:class="{
			'disabled': disabled,
			'button-link': true,
			'button-link-button': isButton ?? false,
			'button-link-inverted': hasInvertedStyle ?? false,
		}"
		href="javascript:void(0)"
	>
		<slot />
	</a>
</template>

<script setup lang="ts">
import type { RouterLinkProps } from 'vue-router';
defineProps<{
	targetUrl: RouterLinkProps['to'];
	isButton?: boolean;
	hasInvertedStyle?: boolean;
	disabled?: boolean;
}>();
</script>

<style scoped>
.button-link {
	color: var(--text-light);
	text-decoration: none;
	font-weight: bold;
	transition: all 0.5s ease;
	width: max-content;
	cursor: pointer;

	&:hover {
		text-decoration: underline;
	}

	&.disabled {
		cursor: not-allowed;
		opacity: 0.5;

		&:hover {
			text-decoration: none;
		}
	}
}

.button-link-button {
	color: var(--text-light);
	background-color: var(--accent-color);
	padding: 10px 24px;
	border-radius: 20px;

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

