<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="headline">
				<img
					src="../assets/Heading.png"
					alt="Naturbild mit Dampflok"
				>
				<h1 class="headline-title">
					Modell<wbr>bahn<wbr>club <span>Hülben e.V.</span>
				</h1>
			</div>
		</div>
		<main>
			<article class="article-container">
				<section id="willkommen">
					<h2 class="section-title">
						Herzlich Willkommen!
					</h2>
					<div class="section-text">
						Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
						<br>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit.<br>
						doloremque iste debitis error, accusantium ex eaque molestiae qui.<br>
						<br>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, suscipit.<br>
					</div>
					<ButtonLink
						target-url="/ueber"
						is-button
					>
						Über uns
					</ButtonLink>
				</section>
			</article>
			<div class="overall-image">
				<img
					loading="lazy"
					src="../assets/overall/overall-1.png"
					alt="Overall Image"
				>
			</div>
			<article class="article-container">
				<section id="aktuelles">
					<h2 class="section-title">
						Aktuelles
					</h2>
					<NewsView
						:count="3"
					/>
					<ButtonLink
						target-url="/aktuelles"
						:is-button="true"
					>
						Weitere Nachrichten
					</ButtonLink>
				</section>
			</article>
			<article
				id="events-container"
				class="article-container"
			>
				<section id="termine">
					<h2 class="section-title">
						Aktuelle Termine
					</h2>
					<div class="section-text">
						Leider können wir aufgrund der aktuellen Situation keine Termine anbieten.
					</div>
				</section>
			</article>
			<div class="overall-image">
				<img
					loading="lazy"
					src="../assets/overall/overall-2.png"
					alt="Overall Image 2"
				>
			</div>
			<article class="article-container">
				<section id="kontakt">
					<h2 class="section-title">
						Kontakt
					</h2>
					<div class="section-text">
						Hier kannst du mit uns in Kontakt treten<br>
						Wir freuen uns über jegliche Fragen, Anregungen, Lob oder Kritik.<br>
						<br>
						Oder komm doch einfach Mal bei uns vorbei!<br>
						<br>
						Bitte füllen sie alle Felder aus und geben sie eine korrekte E-Mail Adresse an, damit<br>
						wir dir antworten können.
					</div>
					<div class="section-form">
						<ContactForm />
					</div>
				</section>
			</article>
			<div class="overall-image">
				<img
					loading="lazy"
					src="../assets/overall/overall-3.png"
					alt="Overall Image 3"
				>
			</div>
		</main>
	</div>
</template>

<script setup lang="ts">
import ButtonLink from '../components/base/ButtonLink.vue';
import ContactForm from '../components/ContactForm.vue';
import NewsView from '../components/NewsView.vue';

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

#events-container {
	padding-top: 0;
}

.overall-image img {
	object-fit: cover;
	width: 100%;
	max-height: 50vh;
	box-shadow: var(--box-shadow-lg);
}

.article-container {
	padding: 3rem 4vw;
	width: calc(100% - 8vw);
}

section {
	display: flex;
	flex-direction: column;
	gap: 24px;

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

.section-text {
	text-align: left;
	font-size: var(--fs-500);
}

</style>
