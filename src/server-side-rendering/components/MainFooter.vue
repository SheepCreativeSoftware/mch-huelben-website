<template>
	<footer>
		<nav class="flex-space-center">
			<span id="copyright">MCH-Hülben e.V. &copy; 2024</span>
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
						target-url="/#kontakt"
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
					src="../assets/logo.svg"
					alt="MCH-Hülben Logo"
				>
			</ButtonLink>
		</div>
	</footer>
</template>

<script setup lang="ts">
import ButtonLink from './base/ButtonLink.vue';

</script>

<style lang="css" scoped></style>
