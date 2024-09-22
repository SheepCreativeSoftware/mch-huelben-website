<template>
	<header :class="{ 'scrolled': isScrolled || props.isBlock }">
		<div class="header-logo">
			<img
				:class="{ 'scrolled': isScrolled || props.isBlock }"
				src="../assets/logo/mch-logo-light-transparent.svg"
				alt="MCH Hülben e.v. Logo"
			>
		</div>
		<nav>
			<ButtonLink
				v-if="isNotHome"
				target-url="/"
			>
				Start
			</ButtonLink>
			<ButtonLink
				:target-url="{path: '/', hash: '#aktuelles'}"
			>
				Aktuelles
			</ButtonLink>
			<ButtonLink
				target-url="/ueber"
			>
				Über
			</ButtonLink>
			<ButtonLink
				target-url="/gallerie"
			>
				Gallerie
			</ButtonLink>
			<ButtonLink
				target-url="/impressum"
			>
				Impressum
			</ButtonLink>
			<ButtonLink
				:target-url="{ path: '/', hash: '#kontakt' }"
				:is-button="true"
				:has-inverted-style="isScrolled || props.isBlock"
			>
				Kontakt
			</ButtonLink>
		</nav>
	</header>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import ButtonLink from './base/ButtonLink.vue';
import { useRoute } from 'vue-router';

const props = defineProps<{
	isBlock?: boolean;
}>();

const route = useRoute();

const isNotHome = computed(() => {
	return route.path !== '/';
});

const isScrolled = ref(false);

if (!import.meta.env.SSR) {
	const handleScroll = () => {
		if (window.scrollY > 0) isScrolled.value = true;
		else isScrolled.value = false;
	};

	window.addEventListener('scroll', handleScroll);
}

</script>

<style lang="css" scoped>
header {
	position: fixed;
	top: 0;
	z-index: 1;
	width: calc(100% - 96px);
	max-width: calc(2000px - 96px);
	display: flex;
	padding: 0 48px;
	padding-top: 16px;
	justify-content: space-between;
	align-items: center;
	transition: all 0.5s ease;
	box-sizing: unset;

	&.scrolled {
		background-color: var(--primary-color-500);
		padding-top: 8px;
		padding-bottom: 8px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
	}
}

.button-link {
	color: var(--bg-color-100);
}

.header-logo img {
	height: 80px;
	transition: all 0.5s ease;

	&.scrolled {
		height: 50px;
	}
}

nav {
	display: flex;
	justify-content: space-between;
	gap: 40px;
	align-items: center;
}
</style>
