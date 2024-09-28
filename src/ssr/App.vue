<template>
	<HeaderNav :is-block="$route.path !== '/'" />
	<router-view
		v-slot="{ Component }"
		:class="{ 'not-home': $route.path !== '/'}"
	>
		<component :is="Component" />
	</router-view>
	<MainFooter />
</template>

<script setup lang="ts">
import HeaderNav from './components/HeaderNav.vue';
import MainFooter from './components/MainFooter.vue';
</script>

<style lang="css" scoped>
.not-home {
	margin-top: 4rem;
}
</style>
