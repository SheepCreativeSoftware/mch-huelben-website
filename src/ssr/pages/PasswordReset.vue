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
					Bitte gib ein neues Passwort ein. Es muss mindestens 8 Zeichen lang sein,
					mindestens einen Großbuchstaben, einen Kleinbuchstaben und eine Zahl enthalten.
					<div
						v-if="resetRequestedSuccess"
						class="password-requested-success"
					>
						Passwort erfolgreich zurückgesetzt.
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
						ref="password-reset-form"
						class="password-reset-form"
						@submit="submitPasswordReset"
					>
						<label
							for="password"
						>
							Neues Passwort:
						</label>
						<!-- The regex pattern ensures the password contains at least one digit,
						one lowercase letter, one uppercase letter, and is at least 8 characters long -->
						<input
							id="password"
							type="password"
							name="password"
							pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}"
							minlength="8"
							autocomplete="off"
							required
							@change="(event) => validatePassword(event, 'password')"
						>
						<label
							for="password-confirm"
						>
							Neues Passwort bestätigen:
						</label>
						<input
							id="password-confirm"
							ref="password-confirm"
							type="password"
							name="password-confirm"
							pattern="(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])\S{8,}"
							minlength="8"
							autocomplete="off"
							required
							@change="(event) => validatePassword(event, 'password-confirm')"
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
import { onMounted, ref } from 'vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import { useAccessStore } from '../stores/access-store';
import { useRouter } from 'vue-router';

const router = useRouter();
const token = router.currentRoute.value.query.token;

const accessStore = useAccessStore();
const resetRequestedSuccess = ref(false);
const resetRequestedFailed = ref(false);
const prefetchPassword = ref({ password: '', passwordConfirm: '' });
let passwordField: HTMLInputElement | null = null;
let passwordConfirmField: HTMLInputElement | null = null;

const validatePassword = (event: Event, type: 'password' | 'password-confirm') => {
	if (!(event.target instanceof HTMLInputElement)) return;
	const { target } = event;
	if (type === 'password') {
		prefetchPassword.value.password = target.value;
		passwordField = target;
	} else {
		prefetchPassword.value.passwordConfirm = target.value;
		passwordConfirmField = target;
	}

	if (prefetchPassword.value.password === prefetchPassword.value.passwordConfirm) {
		passwordField?.setCustomValidity('');
		passwordConfirmField?.setCustomValidity('');
	} else {
		passwordField?.setCustomValidity('Passwörter stimmen nicht überein');
		passwordConfirmField?.setCustomValidity('Passwörter stimmen nicht überein');
	}
};

const submitPasswordReset = async (event: Event) => {
	event.preventDefault();
	const form = event.target as HTMLFormElement;
	const formData = new FormData(form);
	const password = formData.get('password');
	const passwordConfirm = formData.get('password-confirm');

	try {
		if (
			typeof password !== 'string'
			|| typeof passwordConfirm !== 'string'
			|| typeof token !== 'string') throw new Error('Password is not provided');

		await accessStore.resetPassword(token, password);
		resetRequestedSuccess.value = true;
		resetRequestedFailed.value = false;
	} catch {
		resetRequestedSuccess.value = false;
		resetRequestedFailed.value = true;
	}
	form.reset();
};

onMounted(async() => {
	if (!token) await router.replace({ name: 'Home', replace: true });
});
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
