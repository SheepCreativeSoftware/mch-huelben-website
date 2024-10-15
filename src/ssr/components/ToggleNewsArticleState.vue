<template>
	<button
		v-if="accessStore.isLoggedIn"
		class="edit-button"
		@click="toggleActiveState()"
	>
		{{ props.isActive ? 'Deaktivieren' : 'Aktivieren' }}
	</button>
</template>

<script setup lang="ts">
import '../assets/quill.snow.css';
import { routeOnError } from '../modules/route-on-error';
import { useAccessStore } from '../stores/access-store';
import { useNewsStore } from '../stores/news-store';
import { useRouter } from 'vue-router';

const accessStore = useAccessStore();
const newsStore = useNewsStore();
const router = useRouter();

const props = defineProps<{
	identifier: string;
	isActive: boolean;
}>();

const emits = defineEmits<{
	update: [];
}>();

const toggleActiveState = async () => {
	try {
		await newsStore.updateNewsArticleActiveState({
			isActive: !props.isActive,
			identifier: props.identifier,
		});

		emits('update');
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

<style lang="css" scoped>
.edit-button {
	margin-left: var(--space-300);
}
.modal {
	max-width: 1200px;
	border: 1px solid var(--bg-color-700);
	border-radius: var(--border-radius-md);
	> div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}

.button-container {
	display: flex;
	justify-content: center;
	gap: var(--space-400);
	margin-top: 1rem;
}

button {
	margin-top: 1rem;
}

.modal-error {
	color: var(--danger-color);
	font-weight: bold;
}

.editor-container {
	margin-top: 1rem;

	#editor {
		max-width: 1200px;
	}
}

.editor-container, input {
	background-color: var(--bg-color-300);
	border: 1px solid var(--bg-color-700);
	border-radius: var(--border-radius-md);
}

input {
	margin-top: 1rem;
	padding: 0.3rem 1rem;
}
</style>
