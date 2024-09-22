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
			id="constact-form-name"
			type="text"
			name="name"
			required
		>
		<label
			for="email"
		>
			Deine E-Mail:<span class="required-form-input">*</span>
		</label>
		<input
			id="constact-form-email"
			type="email"
			name="email"
			required
		>
		<label
			for="subject"
		>
			Betreff:<span class="required-form-input">*</span>
		</label>
		<input
			id="constact-form-subject"
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
			id="constact-form-message"
			name="message"
			required
		/>
		<div class="contact-form-confirmation-container">
			<input
				id="constact-form-confirmation"
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
	padding: 0 50px;
	max-width: 700px;
	margin: auto;
	gap: 2px;

	label {
		font-size: 1.0rem;
		font-weight: bold;
		align-self: flex-start;
		margin-top: 10px;
	}

	input, textarea {
		font-size: 1.5rem;
		background-color: #D9D9D9;
		border: 1px solid #F5F5F5;
		border-radius: 5px
	}

	textarea {
		resize: none;
		height: 200px;
	}

	.contact-form-confirmation-container {
		margin-top: 10px;
		display: flex;
		align-items: flex-start;
		gap: 10px;

		input[type="checkbox"] {
			transform: scale(1.5);
		}

		label[for="confirmation"] {
			margin-top: 0;
			font-size: 0.95rem;
			font-weight: normal;

			.button-link {
				color: var(--bg-color-900);
				font-size: 1.0rem;
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
		padding: 10px 24px;
		border-radius: 20px;
		border: none;
		cursor: pointer;
		width: max-content;

			&:active {
			transform: translateY(3px);
			transition: all 0.1s ease;
		}
	}

	@media(prefers-color-scheme: dark) {
		input, textarea {
			background-color: #505050;
			color: var(--bg-color-300);
		}

		label[for="confirmation"] {
			.button-link {
				color: var(--bg-color-300) !important;
			}
		}
	}

}

</style>
