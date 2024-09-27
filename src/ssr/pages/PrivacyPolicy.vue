<!-- eslint-disable vue/multi-word-component-names -->
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
			<MainArticleBase>
				<template #title>
					Datenschutz
				</template>
				<template #text>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.<br>
					<br>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit.<br>
					doloremque iste debitis error, accusantium ex eaque molestiae qui.<br>
					<br>
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero, suscipit.<br>
					<br>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Ex repudiandae est ab dolores veritatis natus deserunt, nisi voluptatum error mollitia!
					Lorem, ipsum dolor sit amet consectetur adipisicing elit.
					Aperiam ad natus ab tempora sequi eligendi explicabo neque, incidunt quo est id necessitatibus?
					Quas odit aspernatur illum debitis beatae nam est excepturi rerum deleniti dolorem reprehenderit
					itaque tenetur fugiat sequi culpa possimus consequuntur eos non quisquam natus a, eveniet delectus ea.
					Fugit, vero, fuga totam eaque quis expedita voluptatum, ex quae at quibusdam consequatur
					dolores magni repudiandae dolore quo similique officia animi itaque odit adipisci aliquam!
					Ipsam doloribus illo commodi provident aut minima odio deserunt quaerat sunt accusamus?
					Repudiandae saepe deleniti itaque. Delectus quos perspiciatis quibusdam ad explicabo quaerat quasi. Molestiae!
				</template>
			</MainArticleBase>
			<OverallImage>
				<img
					loading="lazy"
					src="../assets/overall/overall-1.png"
					alt="Overall Image 1"
				>
			</OverallImage>
		</main>
	</div>
</template>

<script setup lang="ts">
import MainArticleBase from '../components/base/MainArticleBase.vue';
import OverallImage from '../components/base/OverallImage.vue';
</script>

<style lang="css" scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
}
</style>
