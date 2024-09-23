<template>
	<header :class="{ 'scrolled': isScrolled || props.isBlock }">
		<div class="header-logo">
			<ButtonLink
				target-url="/"
			>
				<img
					:class="{ 'scrolled': isScrolled || props.isBlock }"
					src="../assets/logo/mch-logo-light-transparent.svg"
					alt="MCH Hülben e.v. Logo"
				>
			</ButtonLink>
		</div>
		<nav>
			<ButtonLink
				:target-url="$route.path === '/' ? {path: '/', hash: '#aktuelles'} : {path: '/aktuelles'}"
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
import ButtonLink from './base/ButtonLink.vue';
import { ref } from 'vue';

const props = defineProps<{
	isBlock?: boolean;
}>();

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
	width: calc(100% - 4rem);
	display: flex;
	padding: 1rem 2rem 0 2rem;
	justify-content: space-between;
	align-items: center;
	transition: all 0.5s ease;

	&.scrolled {
		background-color: var(--primary-color-500);
		padding: 0.5rem 2rem 0.5rem 2rem;
		box-shadow: var(--box-shadow-lg);
	}

	nav {
		display: flex;
		justify-content: space-between;
		gap: var(--space-300);
		align-items: center;
	}
}

.button-link {
	color: var(--bg-color-100);
	font-size: var(--fs-500);
}

.header-logo img {
	max-width: 200px;
	transition: all 0.5s ease;

	&.scrolled {
		max-width: 125px;
	}
}
</style>
