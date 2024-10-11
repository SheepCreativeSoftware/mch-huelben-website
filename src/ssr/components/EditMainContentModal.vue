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
			<div id="editor">
				<div
					v-html="state.content"
				/>
			</div>
			<div>
				<button @click="saveMainContent">
					Speichern
				</button>
				<button @click="closeModal">
					Schließen
				</button>
			</div>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import '../assets/quill.snow.css';
import { reactive, useTemplateRef, watch } from 'vue';
import { usePagesStore } from '../stores/pages-store';
import type Quill from 'quill';

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

const toolbarOptions = [
	[
		'bold', 'italic', 'underline', 'strike',
	],        // Toggled buttons
	['blockquote', 'code-block'],
	['link'],

	[{ 'header': 2 }, { 'header': 3 }, { 'header': 4 }],               // Custom button values
	[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
	[{ 'indent': '-1' }, { 'indent': '+1' }],          // Outdent/indent

	[{ 'align': [] }],

	['clean'],                                         // Remove formatting button
];

let quill: Quill | null;

const openModal = async () => {
	modal.value?.showModal();
	state.identifier = props.identifier;
	state.content = props.content;
	state.title = props.title;
	console.log(state.content);
	const Quill = (await import('quill')).default;
	quill = new Quill('#editor', {
		formats: [
			'align', 'bold', 'blockquote', 'code', 'code-block', 'direction', 'header', 'indent', 'list', 'italic', 'link', 'list', 'strike', 'underline',
		],
		modules: {
			toolbar: toolbarOptions,
		},
		theme: 'snow',
		placeholder: 'Text eingeben...',
	});
	console.log(quill.getSemanticHTML());
};

const closeModal = () => {
	modal.value?.close();
	state.identifier = '';
	state.content = '';
	state.title = '';
	console.log(quill);
	// Remove toolbox
	quill?.theme.modules.toolbar?.container.remove();
	// Remove clipboard
	quill = null;
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
