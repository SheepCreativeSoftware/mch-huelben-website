<template>
	<div class="overall-image">
		<slot />
	</div>
</template>

<script setup lang="ts">
</script>

<style lang="css">
.overall-image img {
	object-fit: cover;
	width: 100%;
	max-height: 45vh;
	min-height: 30vh;
	box-shadow: var(--box-shadow-lg);
}
</style>
