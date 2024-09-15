<template>
	<header>
		<div class="header-logo">
			<img
				src="../assets/logo.png"
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
			<span v-if="isNotHome"> | </span>
			<ButtonLink
				target-url="/aktuelles"
			>
				Akutelles
			</ButtonLink>|
			<ButtonLink
				target-url="/ueber"
			>
				Über
			</ButtonLink>|
			<ButtonLink
				target-url="/gallerie"
			>
				Gallerie
			</ButtonLink>|
			<ButtonLink
				target-url="/impressum"
			>
				Impressum
			</ButtonLink>|
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
import ButtonLink from './base/ButtonLink.vue';
import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();

const isNotHome = computed(() => {
	return route.path !== '/';
});
</script>
