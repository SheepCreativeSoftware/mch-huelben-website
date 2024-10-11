<template>
	<dialog
		ref="modal"
	>
		<div>
			<h3>Seiteninhalt bearbeiten</h3>
			<div
				v-if="state.onError"
				class="modal-error"
			>
				{{ state.onError }}
			</div>
			<label for="title">
				Titel
			</label>
			<input
				id="title"
				v-model="state.title"
				type="text"
			>
			<button @click="saveMainContent">
				Speichern
			</button>
			<button @click="closeModal">
				Schließen
			</button>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { reactive, useTemplateRef, watch } from 'vue';
import { usePagesStore } from '../stores/pages-store';

const pagesStore = usePagesStore();

const props = defineProps<{
	identifier: string;
	title: string,
	content: string,
	show: boolean,
}>();

const emits = defineEmits<{
	close: [];
}>();

const state = reactive({
	identifier: '',
	content: '',
	title: '',
	onError: '',
});

const modal = useTemplateRef('modal');

const openModal = () => {
	modal.value?.showModal();
	state.identifier = props.identifier;
	state.content = props.content;
	state.title = props.title;
};

const closeModal = () => {
	modal.value?.close();
	state.identifier = '';
	state.content = '';
	state.title = '';
	emits('close');
};

watch(() => props.show, (show) => {
	if (show) openModal();
	else closeModal();
});

const saveMainContent = async () => {
	try {
		await pagesStore.updatePagesContent({
			identifier: state.identifier,
			title: state.title,
			content: state.content,
		});
		closeModal();
	} catch (error) {
		if (error instanceof Error) {
			state.onError = error.message;
			return;
		}
		// eslint-disable-next-line no-console -- unknown error handling
		console.error(error);
	}
};

</script>

<style lang="css" scoped>
button {
	margin-top: 1rem;
}

.modal-error {
	color: var(--danger-color);
	font-weight: bold;
}
</style>
