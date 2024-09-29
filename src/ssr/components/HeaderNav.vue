<template>
	<header :class="{ 'scrolled': isScrolled || props.isBlock }">
		<div class="header-logo">
			<ButtonLink target-url="/">
				<img
					:class="{ 'scrolled': isScrolled || props.isBlock }"
					src="../assets/logo/mch-logo-light-transparent.svg"
					alt="MCH Hülben e.v. Logo"
				>
			</ButtonLink>
		</div>
		<nav :class="{ 'menu-open': isMenuOpen }">
			<ButtonLink
				v-if="$route.path !== '/'"
				target-url="/"
				@click="isMenuOpen = false"
			>
				Startseite
			</ButtonLink>
			<ButtonLink
				:target-url="$route.path === '/' ? { path: '/', hash: '#aktuelles' } : { path: '/aktuelles' }"
				@click="isMenuOpen = false"
			>
				Aktuelles
			</ButtonLink>
			<ButtonLink
				target-url="/ueber"
				@click="isMenuOpen = false"
			>
				Über
			</ButtonLink>
			<ButtonLink
				target-url="/gallerie"
				@click="isMenuOpen = false"
			>
				Gallerie
			</ButtonLink>
			<ButtonLink
				target-url="/impressum"
				@click="isMenuOpen = false"
			>
				Impressum
			</ButtonLink>
			<ButtonLink
				:target-url="{ path: '/', hash: '#kontakt' }"
				:is-button="true"
				:has-inverted-style="isScrolled || props.isBlock"
				@click="isMenuOpen = false"
			>
				Kontakt
			</ButtonLink>
		</nav>
		<button
			aria-label="Menü öffnen"
			class="hamburger-menu"
			@click="isMenuOpen = !isMenuOpen"
		>
			<img
				src="../assets/hamburger.svg"
				alt="Hamburger Menü"
			>
		</button>
	</header>
</template>

<script setup lang="ts">
import ButtonLink from './base/ButtonLink.vue';
import { ref } from 'vue';

const MIN_SCREEN_WIDTH = 900;

const props = defineProps<{
	isBlock?: boolean;
}>();

const isScrolled = ref(false);
const isMenuOpen = ref(false);

if (!import.meta.env.SSR) {
	const handleScroll = () => {
		if (window.scrollY > 0 || window.innerWidth < MIN_SCREEN_WIDTH) isScrolled.value = true;
		else isScrolled.value = false;
	};

	const closeMenu = () => {
		if (window.innerWidth >= MIN_SCREEN_WIDTH) isMenuOpen.value = false;
	};

	window.addEventListener('scroll', handleScroll);
	window.addEventListener('resize', closeMenu);
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
	max-width: calc(2000px - 4rem);

	&.scrolled {
		background-color: var(--primary-color-500);
		padding: 0.5rem 2rem 0.5rem 2rem;
		box-shadow: var(--box-shadow-lg);
	}

	nav {
		display: flex;
		justify-content: space-between;
		gap: var(--space-500);
		align-items: center;

		.button-link {
			color: var(--bg-color-100);
			font-size: var(--fs-500);
		}
		@media(prefers-color-scheme: dark) {
			.button-link:not(.button-link-inverted) {
				color: var(--bg-color-900);
			}
		}
	}

	@media(width <= 900px) {
		background-color: var(--primary-color-500);
		padding: 0.5rem 2rem 0.5rem 2rem;

		nav {
			display: flex;
			flex-direction: column;
			position: absolute;
			top: -100vh;
			left: 0;
			width: 100%;
			background-color: var(--primary-color-500);
			z-index: -1;
			transition: all 1.0s ease;

			.button-link {
				width: 100%;
				text-align: center;
				font-size: var(--fs-700);
			}

			.button-link-button.button-link-inverted {
				color: var(--bg-color-100);
				background-color: var(--primary-color-500);
			}
			@media(prefers-color-scheme: dark) {
				.button-link.button-link-inverted {
					color: var(--bg-color-900);
				}
			}

			&.menu-open {
				top: 100%;
			}
		}
	}

	.hamburger-menu {
		display: none;
		cursor: pointer;
		border: none;
		background: none;

		@media(width <= 900px) {
			display: block;

			&:hover {
				filter: drop-shadow(1px 1px 3px #ffffff);
			}
		}
	}
}

.header-logo img {
	max-width: 200px;
	transition: all 0.5s ease;

	&.scrolled {
		max-width: 125px;
	}

	@media(width <= 900px) {
		max-width: 125px;
	}
}
</style>
