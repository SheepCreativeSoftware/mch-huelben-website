<template>
	<button
		v-if="accessStore.isLoggedIn"
		class="edit-button"
		@click="openModal()"
	>
		Neuen Artikel Hinzufügen
	</button>
	<dialog
		v-if="accessStore.isLoggedIn && state.open"
		ref="modal"
		class="modal"
	>
		<div>
			<h3>Nachricht hinzufügen</h3>
			<div
				v-if="state.onError"
				class="modal-error"
			>
				{{ state.onError }}
			</div>
			<input
				id="title"
				v-model="state.title"
				placeholder="Titel eingeben"
				type="text"
			>
			<div class="editor-container">
				<div id="editor">
					<!-- eslint-disable-next-line vue/no-v-html -- this is sanitized -->
					<div v-html="sanitizeHtml(state.content)"	/>
				</div>
			</div>
			<div>
				<input
					id="has-event"
					v-model="state.hasEvent"
					type="checkbox"
					name="has-event"
				>
				<label for="has-event">Veranstaltung hinzufügen</label>
			</div>
			<div v-if="state.hasEvent">
				<div class="event-item">
					<label for="event-title">Veranstaltung Titel</label>
					<input
						id="event-title"
						v-model="state.event.title"
						type="text"
					>
				</div>
				<div class="event-item">
					<label for="event-date">Startdatum</label>
					<input
						id="event-date"
						v-model="state.event.fromDate"
						type="date"
					>
				</div>
				<div class="event-item">
					<label for="event-date">Enddatum</label>
					<input
						id="event-date"
						v-model="state.event.toDate"
						type="date"
					>
				</div>
			</div>
			<div class="button-container">
				<button @click="addContent">
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
import { useNewsStore } from '../stores/news-store';

const accessStore = useAccessStore();
const newsStore = useNewsStore();

const emits = defineEmits<{
	update: [];
}>();

const formatDate = (date: Date) => {
	return date.toISOString().split('T')[0];
};

const state = reactive({
	open: false,
	content: '',
	title: '',
	hasEvent: false,
	event: {
		title: '',
		fromDate: formatDate(new Date()),
		toDate: formatDate(new Date()),
	},
	onError: '',
});

const modal = useTemplateRef('modal');
let quill: Quill | null = null;

const openModal = async () => {
	state.open = true;
	await nextTick();
	modal.value?.showModal();
	quill = await getQuillRichTextEditorInstance('#editor', '.editor-container');
};

const closeModal = () => {
	if (quill) removeQuillInstance(quill);
	quill = null;

	modal.value?.close();
	state.open = false;
	state.content = '';
	state.title = '';
	state.hasEvent = false;
	state.event.title = '';
	state.onError = '';

	emits('update');
};

const setEventDateToMidnightUTC = (date: Date): Date => {
	date.setUTCHours(0, 0, 0, 0);
	return date;
};

const addContent = async () => {
	try {
		let quillHtmlContent = quill?.getSemanticHTML();
		if (quillHtmlContent) quillHtmlContent = quillHtmlContent.replaceAll('<p></p>', '<p><br></p>');
		if (typeof quillHtmlContent !== 'string') throw new Error('Content is not a string');
		// eslint-disable-next-line init-declarations -- it is intended to be undefined if no event is set
		let event;
		if (state.hasEvent) {
			event = {
				title: state.event.title,
				fromDate: setEventDateToMidnightUTC(new Date(state.event.fromDate)),
				toDate: setEventDateToMidnightUTC(new Date(state.event.toDate)),
			};
			if (event.fromDate > event.toDate) throw new Error('Startdatum muss vor dem Enddatum liegen');
		}
		await newsStore.addNewsArticle({
			content: quillHtmlContent,
			title: state.title,
			event,
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

.event-item {
	display: flex;
	flex-direction: column;

	label {
		margin-top: 0.5rem;
	}
	input {
		margin-top: 0.25rem;
	}
}
</style>
