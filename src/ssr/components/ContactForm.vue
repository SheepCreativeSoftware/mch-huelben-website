<template>
	<form
		class="contact-form"
		action="/api/contact"
		method="post"
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
				name="confirmation"
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
</template>

<script setup lang="ts">
import ButtonLink from './base/ButtonLink.vue';
</script>

<style lang="css" scoped>
.required-form-input {
	color: red;
}

form {
	display: flex;
	flex-direction: column;
	padding: 0 4vw;
	max-width: 800px;
	margin: auto;
	gap: 2px;

	label {
		font-size: var(--fs-300);
		font-weight: bold;
		align-self: flex-start;
		margin-top: 10px;
	}

	input, textarea {
		font-family: var(--font-sans-serif);
		font-size: var(--fs-500);
		padding: 0.2rem 0.3rem;
		line-height: var(--space-300);
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
		gap: var(--space-100);

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

	.button-submit {
		margin-top: 10px;
		align-self: center;
		background-color: var(--primary-color-500);
		color: var(--bg-color-300);
		font-size: 2rem;
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

	@media(prefers-color-scheme: dark) {
		.button-submit {
			color: var(--bg-color-900);
		}
	}
}

</style>
