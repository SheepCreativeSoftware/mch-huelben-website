<template>
	<article class="article-container">
		<section>
			<h2 class="section-title">
				<slot name="title">
					<!-- title -->
				</slot>
			</h2>
			<div
				v-if="$slots.text"
				class="section-text"
			>
				<slot name="text">
					<!-- text -->
				</slot>
			</div>
			<template v-if="$slots.additional">
				<slot name="additional">
				<!-- additional -->
				</slot>
			</template>
		</section>
	</article>
</template>

<script setup lang="ts"></script>

<style lang="css" scoped>
.article-container {
	padding: 3rem 4vw;
	width: calc(100% - 8vw);
	max-width: 1000px;
	margin: 0 auto;
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
	font-size: var(--fs-400);
}
</style>
