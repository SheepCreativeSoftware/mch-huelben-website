<template>
	<footer>
		<nav class="flex-space-center">
			<span id="copyright">MCH-Hülben e.V.<wbr> &copy; 2014-2024</span>
			<ul>
				<li>
					<ButtonLink
						target-url="/impressum"
					>
						Impressum
					</ButtonLink>
				</li>
				<li>
					<ButtonLink
						target-url="/datenschutz"
					>
						Datenschutz
					</ButtonLink>
				</li>
				<li>
					<ButtonLink
						:target-url="{ path: '/', hash: '#kontakt' }"
					>
						Kontakt
					</ButtonLink>
				</li>
			</ul>
			<span id="created-by">Created by M.Egner</span>
		</nav>
		<div class="logo-conatiner">
			<div><!-- Intentionally left blank for grid container--></div>
			<ButtonLink
				target-url="/"
			>
				<img
					class="footer-logo"
					src="../assets/logo/mch-logo-light-transparent.svg"
					alt="MCH-Hülben Logo"
				>
			</ButtonLink>
			<ButtonLink
				v-if="!accessStore.isLoggedIn"
				id="login-button"
				is-button
				target-url="/login"
			>
				Login
			</ButtonLink>
			<button
				v-else
				@click="accessStore.logoutUser"
			>
				Logout
			</button>
		</div>
	</footer>
</template>

<script setup lang="ts">
import ButtonLink from './base/ButtonLink.vue';
import { useAccessStore } from '../stores/access-store';

const accessStore = useAccessStore();

</script>

<style lang="css" scoped>
footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: var(--space-400);
	padding: 2rem;
	background-color: var(--bg-color-400);
	span, li, a {font-size: var(--fs-300);}

	nav {
		display: grid;
        grid-template-columns: 1fr 1fr 1fr;
		width: 100%;
		max-width: 1200px;
		gap: var(--space-400);

		ul {
			display: flex;
			justify-content: space-between;
			margin: 0;
			padding: 0;
			gap: var(--space-500);
			list-style: disc;
			max-width: fit-content;
            justify-self: center;

			li {
				text-align: center;
			}

			li:first-child {
				list-style: none;
			}
		}

		:first-child:not(li) {
			text-align: start;
		}

		:last-child:not(li) {
			text-align: end;
		}

		.button-link {
			font-weight: normal;
		}
	}
}

.logo-conatiner {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	width: 100%;
	align-items: center;
	justify-items: center;

	& :last-child {
		justify-self: end;
	}
}

#login-button {
	font-size: var(--fs-400);
}

@media(width < 768px) {
	footer {
		flex-direction: column;
		align-items: start;
		nav{
			ul {
				flex-direction: column;
				list-style: none;

				gap: var(--space-100);
			}
		}

	}
}

@media (prefers-color-scheme: dark) {
	footer {
		background-color: var(--bg-color-100);

		.footer-logo {
			filter: invert(80%);
		}
	}
}
</style>
