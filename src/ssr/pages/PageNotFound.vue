<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-3.png"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<ContainerComponent
				class="section-container"
				gap="24px"
			>
				<section>
					<h2 class="section-title">
						Server Error
					</h2>
					<p class="section-text">
						<strong>404 - Seite nicht gefunden</strong>
					</p>
				</section>
				<section>
					<h3 class="section-title">
						Die Seite konnte nicht gefunden werden
					</h3>
					<div class="section-text">
						Die von dir gesuchte Seite konnte nicht gefunden werden.<br>
						Die Seite existiert nicht oder wurde an einen anderen Ort verschoben.<br>
						Bitte überprüfe die <abbr
							title="Mit der URL wird eine Adresse bezeichnet, die auf eine Internetadresse einer Webseite verweißt"
						>
							URL
						</abbr> und versuche es erneut.<br>
						<br>
						Alternativ kannst du auch auf <a @click="router.push('/')">die Startseite zurückkehren</a>.<br>
						Oder zurückkehren <a @click="router.back()">zur vorherigen Seite</a>.<br>
					</div>
				</section>
			</ContainerComponent>
		</main>
	</div>
</template>

<script setup lang="ts">
import ContainerComponent from '../components/base/ContainerComponent.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

</script>

<style scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
	height: 40vh;
}

.section-container {
	padding: 4rem 4vw;
	width: calc(100% - 8vw);
}

section {
	display: flex;
	flex-direction: column;
	gap: var(--space-200);

	a {
		font-size: var(--fs-400);
		font-weight: bold;

		&:hover {
			text-decoration: underline;
			cursor: pointer;
		}
	}
}

h2.section-title {
	display: flex;
	flex-direction: row;

	&::after {
		content: '';
		flex: 1;
		border-bottom: 2px solid var(--primary-color-500);
		margin: auto;
		margin-left: 10px;
	}
}

h3.section-title {
	display: flex;
	flex-direction: row;
}

.section-text {
	text-align: left;
	font-size: var(--fs-400);
}
</style>
