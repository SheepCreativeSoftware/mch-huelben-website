<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-1.png"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase>
				<template #title>
					Gallerie
				</template>
				<template #text>
					Hier gibt es leider noch keine Inhalte.
				</template>
			</MainArticleBase>
		</main>
	</div>
</template>

<script setup lang="ts">
import MainArticleBase from '../components/base/MainArticleBase.vue';
</script>

<style lang="css" scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
}
</style>
