<template>
	<dialog
		ref="modal"
		class="modal"
	>
		<div>
			<h3>Seiteninhalt bearbeiten</h3>
			<div
				v-if="state.onError"
				class="modal-error"
			>
				{{ state.onError }}
			</div>
			<input
				id="title"
				v-model="state.title"
				type="text"
			>
			<div class="editor-container">
				<div id="editor">
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(state.content)"	/>
				</div>
			</div>
			<div class="button-container">
				<button @click="updateContent">
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
import { getQuillDefaultOptions, getQuillRichTextEditor, removeQuillInstance } from '../modules/quill-rich-text-editor';
import { onMounted, reactive, useTemplateRef } from 'vue';
import type Quill from 'quill';
import { sanitizeHtml } from '../../shared/protection/sanitize-html';
import { usePagesStore } from '../stores/pages-store';

const pagesStore = usePagesStore();

const props = defineProps<{
	identifier: string;
	title: string,
	content: string,
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
let quill: Quill | null = null;

const openModal = async () => {
	modal.value?.showModal();
	state.identifier = props.identifier;
	state.content = props.content;
	state.title = props.title;
	const QuillRichTextEditor = await getQuillRichTextEditor();
	quill = new QuillRichTextEditor('#editor', getQuillDefaultOptions());
};

const closeModal = () => {
	modal.value?.close();
	state.identifier = '';
	state.content = '';
	state.title = '';
	state.onError = '';

	if (quill) removeQuillInstance(quill);
	quill = null;
	emits('close');
};

const updateContent = async () => {
	try {
		let quillHtmlContent = quill?.getSemanticHTML();
		if (quillHtmlContent) quillHtmlContent = quillHtmlContent.replaceAll('<p></p>', '<p><br></p>');
		await pagesStore.updatePagesContent({
			identifier: state.identifier,
			title: state.title,
			content: quillHtmlContent,
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

onMounted(async () => {
	await openModal();
});
</script>

<style lang="css" scoped>
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
