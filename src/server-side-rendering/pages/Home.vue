<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div class="header-container">
		<HeaderNav />
		<div class="headline">
			<h1 class="headline-title">
				Modellbahnclub Hülben e.V.
			</h1>
		</div>
	</div>
	<main>
		<ContainerComponent>
			<section id="welcome">
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
			</section>
		</ContainerComponent>
		<div class="overall-image">
			<img
				src="../assets/overall/overall-1.png"
				alt="Overall Image"
			>
		</div>
		<ContainerComponent>
			<section id="news">
				<h2 class="section-title">
					Aktuelles
				</h2>
				<NewsView
					:count="3"
				/>
			</section>
		</ContainerComponent>
		<ContainerComponent>
			<section id="events">
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
				src="../assets/overall/overall-2.png"
				alt="Overall Image 2"
			>
		</div>
		<ContainerComponent>
			<section>
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
				src="../assets/overall/overall-3.png"
				alt="Overall Image 3"
			>
		</div>
	</main>
	<MainFooter />
</template>

<script setup lang="ts">
import ContactForm from '../components/ContactForm.vue';
import ContainerComponent from '../components/base/ContainerComponent.vue';
import HeaderNav from '../components/HeaderNav.vue';
import MainFooter from '../components/MainFooter.vue';
import NewsView from '../components/NewsView.vue';

</script>

<style scoped>
.headline {
	position: absolute;
    top: 20vh;
}

.header-container {
	position: relative;
	top: 0;
	width: 100%;
	height: 100vh;
	background-image: url('../assets/Heading.png');
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
}

</style>
