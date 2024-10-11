<template>
	<dialog
		ref="modal"
	>
		<div>
			<h3>Seiteninhalt bearbeiten</h3>
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
		console.error(error);
	}
};

</script>

<style lang="css" scoped>
button {
	margin-top: 1rem;
	background-color: var(--primary-color-500);
	color: var(--bg-color-900);
	font-weight: bold;
	padding: 0.8rem 1.6rem;
	border-radius: var(--border-radius-xl);
	border: none;
	cursor: pointer;
	width: max-content;

		&:active {
		transform: translateY(3px);
		transition: all 0.1s ease;
	}
}
</style>
