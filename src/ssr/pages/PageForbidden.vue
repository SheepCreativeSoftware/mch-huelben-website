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
						<strong>403 - Forbidden</strong>
					</template>
				</MainArticleBase>
				<SubArticleBase>
					<template #title>
						Sie haben keine Berechtigung für diese Seite
					</template>
					<template #text>
						Die von dir gesuchte Seite konnte nicht aufgerufen werden.<br>
						Bitte überprüfe deine Berechtigungen und versuche es erneut oder wende dich an den Administrator.<br>
						Bitte überprüfe die <abbr
							title="Mit der URL wird eine Adresse bezeichnet, die auf eine Internetadresse einer Webseite verweißt"
						>
							URL
						</abbr> und versuche es erneut.<br>
						<br>
						Alternativ kannst du auch auf <a @click="router.push('/')">die Startseite zurückkehren</a>.<br>
						Oder zurückkehren <a @click="router.back()">zur vorherigen Seite</a>.<br>
					</template>
				</SubArticleBase>
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
</style>
