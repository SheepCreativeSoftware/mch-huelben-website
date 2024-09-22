<template>
	<div>
		<div class="header-container">
			<HeaderNav :is-block="true" />
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
						<strong>400 - Fehlerhafte Anfrage</strong>
					</p>
				</section>
				<section>
					<h3 class="section-title">
						Die Seite oder der Seiteninhalt konnte nicht geladen werden
					</h3>
					<div class="section-text">
						Die von dir gesuchte Seite konnte nicht geladen werden.<br>
						Bei der Anfrage ist ein Fehler aufgetreten.<br>
						Versuche es zu einem späteren Zeitpunkt erneut.<br>
						<br>
						Alternativ kannst du auch auf <a @click="router.push('/')">die Startseite zurückkehren</a>.<br>
						Oder zurückkehren <a @click="router.back()">zur vorherigen Seite</a>.<br>
					</div>
				</section>
				<section>
					<p class="section-text">
						<strong>Details zur Anfrage:</strong>
					</p>
					<ul class="error-list">
						<li
							v-for="(value, key) in route.query"
							:key="`${key}`"
						>
							<strong>{{ `${key}`.toUpperCase() }}:</strong> {{ `${value}` }}
						</li>
					</ul>
				</section>
			</ContainerComponent>
		</main>
	</div>
</template>

<script setup lang="ts">
import ContainerComponent from '../components/base/ContainerComponent.vue';
import HeaderNav from '../components/HeaderNav.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const route = router.currentRoute.value;

</script>

<style scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
	height: 40vh;
}

.section-container {
	padding: 75px 10%;
	width: calc(100% - 20%);
}

section {
	display: flex;
	flex-direction: column;
	gap: 24px;

	a {
		font-size: 1.5rem;
		font-weight: bold;
		text-decoration: underline;
		color: var(--accent-color);
	}

	@media(prefers-color-scheme: dark) {
		a {
			color: var(--text-light);
		}
	}
}

h2.section-title {
	display: flex;
	flex-direction: row;

	&::after {
		content: '';
		flex: 1;
		border-bottom: 2px solid var(--accent-color);
		margin: auto;
		margin-left: 10px;
	}
}

h3.section-title {
	display: flex;
	flex-direction: row;
	font-size: 2rem;
}

.section-text {
	text-align: left;
	font-size: 1.5rem;
}

.error-list {
	list-style-type: none;
	padding-left: 10px;
	margin: 0;
	display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 500px;
    text-align: start;
}
</style>
