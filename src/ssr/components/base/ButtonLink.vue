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
	color: var(--bg-color-300);
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
	color: var(--bg-color-300);
	background-color: var(--primary-color-500);
	padding: 10px 24px;
	border-radius: 20px;
	box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);

	&.button-link-inverted {
		color: var(--bg-color-300);
		background-color: var(--bg-color-900);
	}

	&:active {
		transform: translateY(3px);
		transition: all 0.1s ease;
	}
}

.button-link-inverted {
	color: var(--bg-color-900);
}

@media (prefers-color-scheme: dark) {
	.button-link {
		color: var(--bg-color-300);
	}

	.button-link-button {
		color: var(--bg-color-300);

		&.button-link-inverted {
			color: var(--bg-color-300);
		}
	}

	.button-link-inverted {
		color: var(--bg-color-900);
	}
}
</style>

