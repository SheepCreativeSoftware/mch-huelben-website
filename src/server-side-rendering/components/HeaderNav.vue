<template>
	<header :class="{ 'scrolled': isScrolled }">
		<div class="header-logo">
			<img
				:class="{ 'scrolled': isScrolled }"
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
				Akutelles
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
				:has-inverted-style="isScrolled"
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

	&.scrolled {
		background-color: var(--accent-color);
		padding-top: 8px;
		padding-bottom: 8px;
	}
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
