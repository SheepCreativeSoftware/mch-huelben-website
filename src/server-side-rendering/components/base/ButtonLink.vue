<template>
	<router-link
		:class="{
			'nav-link': true,
			'nav-link-button': isButton ?? false,
			'nav-link-inverted': hasInvertedStyle ?? false,
		}"
		:to="targetUrl"
	>
		<slot />
	</router-link>
</template>

<script setup lang="ts">
defineProps<{
	targetUrl: string;
	isButton?: boolean;
	hasInvertedStyle?: boolean;
}>();
</script>

<style scoped>
.nav-link {
	color: var(--color-primary);
	text-decoration: none;
}

.nav-link-button {
	background-color: var(--color-primary);
	color: var(--color-white);
	padding: 0.5rem 1rem;
	border-radius: 0.5rem;
}

.nav-link-inverted {
	color: var(--color-white);
	background-color: var(--color-primary);
}
</style>

