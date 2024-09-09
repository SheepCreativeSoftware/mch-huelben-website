<template>
	<h1>{{ fooStore.foo }}</h1>
</template>

<script>
import { useFooStore } from '../store.ts';

export default {
	serverPrefetch() {
		const store = useFooStore(this.$pinia);
	},
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
