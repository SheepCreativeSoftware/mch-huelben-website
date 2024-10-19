<template>
	<button
		v-if="accessStore.isLoggedIn"
		class="edit-button"
		@click="openModal()"
	>
		Bearbeiten
	</button>
	<dialog
		v-if="accessStore.isLoggedIn && state.identifier"
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
import { getQuillRichTextEditorInstance, removeQuillInstance } from '../modules/quill-rich-text-editor';
import { nextTick, reactive, useTemplateRef } from 'vue';
import type Quill from 'quill';
import { sanitizeHtml } from '../../shared/protection/sanitize-html';
import { useAccessStore } from '../stores/access-store';
import { usePagesStore } from '../stores/pages-store';

const accessStore = useAccessStore();
const pagesStore = usePagesStore();

const props = defineProps<{
	content: {
		identifier: string;
		title: string;
		content: string;
	}
}>();

const emits = defineEmits<{
	update: [];
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
	state.content = props.content.content;
	state.title = props.content.title;
	state.identifier = props.content.identifier;
	await nextTick();
	modal.value?.showModal();
	quill = await getQuillRichTextEditorInstance('#editor', '.editor-container');
};

const closeModal = () => {
	if (quill) removeQuillInstance(quill);
	quill = null;

	modal.value?.close();
	state.identifier = '';
	state.content = '';
	state.title = '';
	state.onError = '';

	emits('update');
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
</script>

<style lang="css" scoped>
.edit-button {
	margin-top: 0;
}

.modal {
	max-width: 1200px;
	width: calc(100vw - 5rem);
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
