<template>
	<button
		v-if="accessStore.isLoggedIn"
		class="edit-button"
		@click="toogleState()"
	>
		{{ props.content.isActive }}
	</button>
</template>

<script setup lang="ts">
import { routeOnError } from '../modules/route-on-error';
import { useAccessStore } from '../stores/access-store';
import { useNewsStore } from '../stores/news-store';
import { useRouter } from 'vue-router';

const accessStore = useAccessStore();
const newsStore = useNewsStore();
const router = useRouter();

const props = defineProps<{
	content: {
		identifier: string;
		isActive: boolean;
	}
}>();

const toogleState = async () => {
	try {
		await newsStore.updateNewsArticleActiveState({
			isActive: !props.content.isActive,
			identifier: props.content.identifier,
		});
	} catch (error) {
		if (error instanceof Error) {
			await routeOnError(router, error);
			return;
		}
		// eslint-disable-next-line no-console -- unknown error handling
		console.error(error);
	}
};
</script>

<style lang="css" scoped></style>
