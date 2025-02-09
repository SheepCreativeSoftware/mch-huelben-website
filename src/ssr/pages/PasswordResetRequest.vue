<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-11.jpg"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase>
				<template #title>
					Passwort zurücksetzen
				</template>
				<template #text>
					<noscript>Bitte aktiviere JavaScript in deinem Browser, um diese Seite nutzen zu können.</noscript>
					Bitte gib deine E-Mail-Adresse ein, um dein Passwort zurückzusetzen.
					<div
						v-if="resetRequestedSuccess"
						class="password-requested-success"
					>
						Bitte überprüfe deine E-Mails, um dein Passwort zurückzusetzen.
					</div>
					<div
						v-if="resetRequestedFailed"
						class="password-requested-failed"
					>
						Etwas ist schiefgelaufen. Bitte versuche es später erneut.
					</div>
				</template>
				<template #additional>
					<form
						ref="password-reset-request-form"
						class="password-reset-request-form"
						@submit="submitPasswordResetRequest"
					>
						<label
							for="email"
						>
							E-Mail:
						</label>
						<input
							id="email"
							type="email"
							name="email"
							autocomplete="email"
							required
						>
						<button
							class="button-submit"
							type="submit"
						>
							Passwort zurücksetzen
						</button>
					</form>
				</template>
			</MainArticleBase>
		</main>
	</div>
</template>

<script setup lang="ts">
import MainArticleBase from '../components/base/MainArticleBase.vue';
import { ref } from 'vue';
import { useAccessStore } from '../stores/access-store';

const accessStore = useAccessStore();
const resetRequestedSuccess = ref(false);
const resetRequestedFailed = ref(false);

const submitPasswordResetRequest = async (event: Event) => {
	event.preventDefault();
	const form = event.target as HTMLFormElement;
	const formData = new FormData(form);
	const email = formData.get('email');

	try {
		if (typeof email !== 'string') throw new Error('Email is not provided');

		await accessStore.requestPasswordReset(email);
		resetRequestedSuccess.value = true;
		resetRequestedFailed.value = false;
	} catch {
		resetRequestedSuccess.value = false;
		resetRequestedFailed.value = true;
	}
	form.reset();
};
</script>

<style lang="css" scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
	max-height: 45vh;
}

.password-requested-success {
	color: var(--success-color);
	font-weight: bold;
}

.password-requested-failed {
	color: var(--danger-color);
	font-weight: bold;
}

button {
	margin-top: 1rem;
}

form {
	display: flex;
	flex-direction: column;
	justify-content: start;
	max-width: 300px;
	width: 100%;
	gap: 2px;

	label {
		font-size: var(--fs-300);
		font-weight: bold;
		align-self: flex-start;
		margin-top: 10px;
	}

	input {
		font-family: var(--font-sans-serif);
		font-size: var(--fs-400);
		padding: 0.2rem 0.3rem;
		background-color: var(--bg-color-300);
		border: 1px solid var(--bg-color-700);
		border-radius: var(--border-radius-md);
	}
}
</style>
