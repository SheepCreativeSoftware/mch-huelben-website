<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<h1>{{ fooStore.foo }}</h1>
</template>

<script lang="ts">
import { useFooStore } from '../stores/store.ts';

export default {
	/*
	 * ServerPrefetch() {
	 * 	const store = useFooStore();
	 * 	console.log('store', store);
	 * },
	 */
	setup() {
		const fooStore = useFooStore();
		if (!fooStore.foo) fooStore.fetchFoo();

		return { fooStore };
	},
};
</script>

<style scoped>
h1 {
  color: red;
}
</style>
