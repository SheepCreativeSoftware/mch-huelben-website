<template>
	<header ref="header">
		<div class="header-logo">
			<img
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
				target-url="/aktuelles"
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
				target-url="/contact"
				:is-button="true"
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

const header = ref<HTMLElement>();

const handleScroll = () => {
	if (window.scrollY > 0) header.value?.classList.add('scrolled');
	else header.value?.classList.remove('scrolled');
};

window.addEventListener('scroll', handleScroll);
</script>

<style lang="css" scoped>
header {
	position: fixed;
	top: 0;
	z-index: 1;
	width: calc(100% - 96px);
	display: flex;
	padding: 4px 48px;
	justify-content: space-between;
	align-items: center;
	transition: all 0.5s ease;

	&.scrolled {
		background-color: var(--background-dark);
	}
}

.header-logo img {
	width: 200px;
	height: 80px;
}

nav {
	display: flex;
	justify-content: space-between;
	gap: 25px;
	align-items: center;
}
</style>
