<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<h1>{{ msg }}</h1>
	<p class="import-meta-url">
		{{ url }}
	</p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({

	setup() {
		/* @ts-expect-error this is handled by vite */
		const url = import.meta.env.SSR      ? import.meta.url      : document.querySelector('.import-meta-url')?.textContent;
		return {
			msg: 'About',
			url,
		};
	},
});
</script>

<style scoped>
h1 {
  color: red;
}
</style>
