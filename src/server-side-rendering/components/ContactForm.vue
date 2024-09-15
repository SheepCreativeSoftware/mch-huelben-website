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
		<button
			class="button-accent"
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
</style>
