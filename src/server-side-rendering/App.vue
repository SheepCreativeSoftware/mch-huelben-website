<template>
	<div>
		<router-view v-slot="{ Component }">
			<Suspense>
				<div>
					<component :is="Component" />
				</div>
			</Suspense>
		</router-view>
		<MainFooter />
	</div>
</template>

<script setup lang="ts">
</script>

  <style>
  #app {
	max-width: 1440px;
  }
  </style>
