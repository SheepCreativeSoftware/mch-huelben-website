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
					Aktuelles rund um den Verein
				</template>
				<template #text>
					Hier werden wir in unregelmässigen abständen Neuigkeiten veröffentlicht.
				</template>
			</MainArticleBase>
		</main>
	</div>
</template>

<script setup lang="ts">
import MainArticleBase from '../components/base/MainArticleBase.vue';
</script>

<style lang="css" scoped>
</style>
