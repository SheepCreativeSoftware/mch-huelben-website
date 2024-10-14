<template>
	<noscript>
		Bitte aktiviere JavaScript, um das Kontaktformular nutzen zu können.<br>
	</noscript>
	<form
		ref="contact-form"
		class="contact-form"
		action="/api/contact/message"
		method="post"
		@submit="submitForm"
	>
		<label
			for="name"
		>
			Dein Name:<span class="required-form-input">*</span>
		</label>
		<input
			id="name"
			type="text"
			name="name"
			autocomplete="name"
			required
		>
		<label
			for="email"
		>
			Deine E-Mail:<span class="required-form-input">*</span>
		</label>
		<input
			id="email"
			type="email"
			name="email"
			autocomplete="email"
			required
		>
		<label
			for="subject"
		>
			Betreff:<span class="required-form-input">*</span>
		</label>
		<input
			id="subject"
			type="text"
			name="subject"
			required
		>
		<label
			for="message"
		>
			Deine Nachricht:<span class="required-form-input">*</span>
		</label>
		<textarea
			id="message"
			name="message"
			required
		/>
		<div class="contact-form-confirmation-container">
			<input
				id="confirmation"
				type="checkbox"
				name="GDPRConfirmation"
			>
			<label
				for="confirmation"
			>
				Ich willige in die in der
				<ButtonLink
					target-url="/datenschutz"
				>
					Datenschutzerklärung
				</ButtonLink>
				beschriebene Verarbeitung meiner Daten ein.
			</label>
		</div>
		<button
			class="button-submit"
			type="submit"
		>
			Absenden
		</button>
	</form>
	<dialog
		ref="dialog"
		class="modal"
	>
		<div>
			<p>
				{{ message }}
			</p>
			<button
				@click="dialog?.close()"
			>
				Schließen
			</button>
		</div>
	</dialog>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue';
import ButtonLink from './base/ButtonLink.vue';
import type { ZodIssue } from 'zod';

const CLOSE_MODAL_TIMEOUT = 5000;
const contactForm = useTemplateRef('contact-form');
const dialog = useTemplateRef('dialog');
const message = ref<string>('');

const submitForm = async (event: Event) => {
	const form = contactForm.value;
	if (!(form instanceof HTMLFormElement)) return;
	event.preventDefault();

	const formData = new FormData(form);
	const bodyObject = {};
	for (const [key, value] of formData.entries()) {
		if (key === 'GDPRConfirmation') {
			Object.assign(bodyObject, { [key]: value === 'on' });
			continue;
		}
		Object.assign(bodyObject, { [key]: value });
	}
	const url = form.action;
	const options: RequestInit = {
		headers: {
			'Content-Type': 'application/json',
		},
		method: form.method,
		body: JSON.stringify(bodyObject),
	};

	const response = await fetch(url, options);

	if (response.ok) {
		form.reset();
		message.value = 'Nachricht erfolgreich versendet!';
		dialog.value?.showModal();
	} else {
		const body: { message: string | ZodIssue[] } = await response.json();
		if (Array.isArray(body.message) && body.message[0].message === 'Invalid email') message.value = 'Bitte gib eine gültige E-Mail-Adresse ein.';
		else message.value = 'Nachricht konnte nicht versendet werden. Bitte versuche es später erneut.';

		dialog.value?.showModal();
	}

	setTimeout(() => {
		dialog.value?.close();
	}, CLOSE_MODAL_TIMEOUT);
};
</script>

<style lang="css" scoped>
.required-form-input {
	color: red;
}

button {
	margin-top: 1rem;
	align-self: center;
}

.modal {
	max-width: 500px;
	border: 1px solid var(--bg-color-700);
	border-radius: var(--border-radius-md);
	div {
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
}

form {
	display: flex;
	flex-direction: column;
	max-width: 800px;
	width: 100%;
	gap: 2px;

	label {
		font-size: var(--fs-300);
		font-weight: bold;
		align-self: flex-start;
		margin-top: 10px;
	}

	input, textarea {
		font-family: var(--font-sans-serif);
		font-size: var(--fs-400);
		padding: 0.2rem 0.3rem;
		background-color: var(--bg-color-300);
		border: 1px solid var(--bg-color-700);
		border-radius: var(--border-radius-md);
	}

	textarea {
		resize: none;
		height: 15rem;
	}

	.contact-form-confirmation-container {
		margin-top: 10px;
		display: flex;
		align-items: flex-start;
		gap: var(--space-200);

		input[type="checkbox"] {
			transform: scale(1.5);
		}

		label[for="confirmation"] {
			margin-top: 0;
			font-size: var(--fs-200);
			font-weight: normal;

			.button-link {
				color: var(--bg-color-900);
				font-size: var(--fs-200);
				font-weight: bold;
			}
		}
	}
}

</style>
