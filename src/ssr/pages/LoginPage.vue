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
					Login
				</template>
				<template #text>
					<noscript>
						Bitte aktiviere JavaScript, um diese Seite nutzen zu können.<br>
					</noscript>
					Bitte logge dich ein.
					<div
						v-if="loginFailed"
						class="login-failed"
					>
						Login fehlgeschlagen. Bitte überprüfe deine Eingaben.
					</div>
				</template>
				<template #additional>
					<form
						ref="login-form"
						class="login-form"
						@submit="submitLoginForm"
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
						<label
							for="password"
						>
							Passwort:
						</label>
						<input
							id="password"
							type="password"
							name="password"
							autoComplete="current-password"
							required
						>
						<button
							class="button-submit"
							type="submit"
						>
							Login
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
import { useRouter } from 'vue-router';

const accessStore = useAccessStore();
const router = useRouter();
const loginFailed = ref(false);

const submitLoginForm = async (event: Event) => {
	event.preventDefault();
	const form = event.target as HTMLFormElement;
	const formData = new FormData(form);
	const email = formData.get('email');
	const password = formData.get('password');

	try {
		if (typeof email !== 'string' || typeof password !== 'string') throw new Error('Email or password is not provided');

		await accessStore.loginUser(email, password);
		loginFailed.value = false;
		await router.push({ name: 'home' });
	} catch {
		loginFailed.value = true;
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

.login-failed {
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
