<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="headline">
				<img
					:src="HeadingImage"
					alt="Naturbild mit Dampflok"
				>
				<h1 class="headline-title">
					Modell<wbr>bahn<wbr>club <span>Hülben e.V.</span>
				</h1>
			</div>
		</div>
		<main>
			<MainArticleBase>
				<template #title>
					Herzlich Willkommen!
				</template>
				<template #text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
					<br>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit.<br>
					doloremque iste debitis error, accusantium ex eaque molestiae qui.<br>
					<br>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, suscipit.<br>
				</template>
				<template #additional>
					<ButtonLink
						target-url="/ueber"
						is-button
					>
						Über uns
					</ButtonLink>
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-1.png"
					alt="Overall Image 1"
				>
			</OverallImage>
			<MainArticleBase id="aktuelles">
				<template #title>
					Aktuelles
				</template>
				<template #additional>
					<NewsView
						:count="3"
					/>
					<ButtonLink
						target-url="/aktuelles"
						:is-button="true"
					>
						Weitere Nachrichten
					</ButtonLink>
				</template>
			</MainArticleBase>
			<MainArticleBase id="termine">
				<template #title>
					Aktuelle Termine
				</template>
				<template #text>
					Leider können wir aufgrund der aktuellen Situation keine Termine anbieten.
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-2.png"
					alt="Overall Image 2"
				>
			</OverallImage>
			<MainArticleBase id="kontakt">
				<template #title>
					Kontakt
				</template>
				<template #text>
					Hier kannst du mit uns in Kontakt treten<br>
					Wir freuen uns über jegliche Fragen, Anregungen, Lob oder Kritik.<br>
					<br>
					Oder komm doch einfach Mal bei uns vorbei!<br>
					<br>
					Bitte füllen sie alle Felder aus und geben sie eine korrekte E-Mail Adresse an, damit<br>
					wir dir antworten können.
				</template>
				<template #additional>
					<ContactForm />
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-3.png"
					alt="Overall Image 3"
				>
			</OverallImage>
		</main>
	</div>
</template>

<script setup lang="ts">
import ButtonLink from '../components/base/ButtonLink.vue';
import ContactForm from '../components/ContactForm.vue';
import HeadingImage from '../assets/Heading.png';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import NewsView from '../components/NewsView.vue';
import OverallImage from '../components/base/OverallImage.vue';
</script>

<style scoped>
.headline {

	text-align: center;
	z-index: 0;

	img {
		height: 100vh;
		min-width: 100%;
		object-fit: cover;
	}

	h1 {
		position: absolute;
		top: 45vh;
		left: 0;
		right: 0;
		margin: 0 var(--space-2) 0 var(--space-2);
		color: var(--bg-color-200);
		text-align: center;
		text-shadow: var(--box-shadow-lg);
		span {
			font-size: inherit;
			white-space: nowrap;
		}

		@media(width < 680px) {
			font-size: 4.5rem;
		}
		@media(prefers-color-scheme: dark) {
			color: var(--bg-color-800);
		}
	}
}

.header-container {
	position: relative;
	top: 0;
	width: 100%;
	height: 100vh;
}

#termine {
	padding-top: 0;
}
</style>
