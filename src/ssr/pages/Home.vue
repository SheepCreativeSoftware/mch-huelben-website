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
			<ContainerComponent>
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
			</ContainerComponent>
			<div class="overall-image">
				<img
					loading="lazy"
					src="../assets/overall/overall-1.png"
					alt="Overall Image"
				>
			</div>
			<ContainerComponent>
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
			</ContainerComponent>
			<ContainerComponent id="events-container">
				<section id="termine">
					<h2 class="section-title">
						Aktuelle Termine
					</h2>
					<div class="section-text">
						Leider können wir aufgrund der aktuellen Situation keine Termine anbieten.
					</div>
				</section>
			</ContainerComponent>
			<div class="overall-image">
				<img
					loading="lazy"
					src="../assets/overall/overall-2.png"
					alt="Overall Image 2"
				>
			</div>
			<ContainerComponent>
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
			</ContainerComponent>
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
import ContainerComponent from '../components/base/ContainerComponent.vue';
import NewsView from '../components/NewsView.vue';

</script>

<style scoped>
.headline {
	display: flex;
	position: absolute;
	text-align: center;
	z-index: 0;

	img {

		height: 100vh;
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
	}
}

.header-container {
	position: relative;
	top: 0;
	width: 100%;
	height: 100vh;
	/* background-image: url('../assets/Heading.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat; */
}

#events-container {
	padding-top: 0;
}

.overall-image img {
	object-fit: cover;
	width: 100%;
	box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

.container-component {
	padding: 75px 10%;
	width: calc(100% - 20%);
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
	font-size: 1.5rem;
}

</style>
