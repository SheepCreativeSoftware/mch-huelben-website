<template>
	<footer>
		<nav class="flex-space-center">
			<span id="copyright">MCH-Hülben e.V. &copy; 2014-2024</span>
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
			<span id="created-by">
				Created by M.Egner<br>
			</span>
		</nav>
		<div class="logo-conatiner">
			<ButtonLink
				target-url="/"
			>
				<img
					class="footer-logo"
					src="../assets/logo/mch-logo-light-transparent.svg"
					alt="MCH-Hülben Logo"
				>
			</ButtonLink>
		</div>
	</footer>
</template>

<script setup lang="ts">
import ButtonLink from './base/ButtonLink.vue';

</script>

<style lang="css" scoped>
footer {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 30px;
	padding: 30px 50px 20px 50px;
	background-color: #d9d9d9;
	font-size: 1.2em;

	nav {
		display: flex;
		justify-content: space-between;
		width: 100%;
		max-width: 1200px;

		ul {
			display: flex;
			justify-content: space-between;
			align-items: start;
			margin: 0;
			padding: 0;
			gap: 30px;
			list-style: disc;
            padding-inline-end: 50px;

			li:first-child {
				list-style: none;
			}
		}

		.button-link {
			font-size: 1.2rem;
			font-weight: normal;
			color: var(--text-dark);
		}
	}
}

@media (prefers-color-scheme: dark) {
	footer {
		background-color: #111;

		.footer-logo {
			filter: invert(75%);
		}

		& nav {
			.button-link {
				color: var(--text-light);
			}
		}
	}
}
</style>
