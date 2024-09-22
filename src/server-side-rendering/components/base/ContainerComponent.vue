<template>
	<div
		class="container-component"
		:style="currentCssGrid"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const {
	columns, rows, gap, justify, align,
} = defineProps<{
	columns?: string;
	rows?: string;
	gap?: string;
	justify?: 'start'| 'end'| 'center'| 'stretch'| 'left' | 'right';
	align?: 'start' | 'end' | 'center' | 'stretch';
}>();

const cssGridDefaults = computed(() => {
	return {
		columns: columns ?? '',
		rows: rows ?? '',
		gap: gap ?? '',
		justify: justify ?? 'stretch',
		align: align ?? 'stretch',
	};
});

const currentCssGrid = computed(() => {
	const grid = cssGridDefaults;

	return {
		'grid-template-columns': grid.value.columns,
		'grid-template-rows': grid.value.rows,
		'grid-gap': grid.value.gap,
		'justify-items': grid.value.justify,
		'align-items': grid.value.align,
	};
});
</script>

<style scoped>
.container-component {
    display: grid;
    width: 100%;
}
</style>
