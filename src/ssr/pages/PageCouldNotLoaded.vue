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
				<MainArticleBase>
					<template #title>
						Client Error
					</template>
					<template #text>
						<strong>400 - Fehlerhafte Anfrage</strong>
					</template>
				</MainArticleBase>
				<SubArticleBase>
					<template #title>
						Die Seite oder der Seiteninhalt konnte nicht geladen werden
					</template>
					<template #text>
						Die von dir gesuchte Seite konnte nicht geladen werden.<br>
						Bei der Anfrage ist ein Fehler aufgetreten.<br>
						Versuche es zu einem späteren Zeitpunkt erneut.<br>
						<br>
						Alternativ kannst du auch auf <a @click="router.push('/')">die Startseite zurückkehren</a>.<br>
						Oder zurückkehren <a @click="router.back()">zur vorherigen Seite</a>.<br>
					</template>
				</SubArticleBase>
				<section>
					<details class="section-text">
						<summary><strong>Details zur Anfrage:</strong></summary>
						<ul class="error-list">
							<li
								v-for="(value, key) in route.query"
								:key="`${key}`"
							>
								<strong>{{ `${key}`.toUpperCase() }}:</strong> {{ `${value}` }}
							</li>
						</ul>
					</details>
				</section>
			</ContainerComponent>
		</main>
	</div>
</template>

<script setup lang="ts">
import ContainerComponent from '../components/base/ContainerComponent.vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import SubArticleBase from '../components/base/SubArticleBase.vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const route = router.currentRoute.value;

</script>

<style scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
	max-height: 45vh;
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
		text-decoration: underline;
	}
}

.section-text {
	text-align: left;
	font-size: var(--fs-400);
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
