<template>
	<div
		class="container-component"
		:style="currentCssGrid"
	>
		<slot />
	</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const {
	columns = '', rows = '', gap = '', justify = 'strech', align = 'stretch',
} = defineProps<{
	columns?: string;
	rows?: string;
	gap?: string;
	justify?: 'start'| 'end'| 'center'| 'stretch'| 'left' | 'right';
	align?: 'start' | 'end' | 'center' | 'stretch';
}>();

const cssGridDefaults = () => {
	return {
		columns,
		rows,
		gap,
		justify,
		align,
	};
};

const buildCssGridProps = () => {
	const grid = cssGridDefaults();

	return {
		'grid-template-columns': grid.columns,
		'grid-template-rows': grid.rows,
		'grid-gap': grid.gap,
		'justify-items': grid.justify,
		'align-items': grid.align,
	};
};

const buildCssGrid = () => {
	const cssGrid = buildCssGridProps();

	return cssGrid;
};

const currentCssGrid = reactive(buildCssGrid());

</script>

<style scoped>
.container-component {
    display: grid;
    width: 100%;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-weight: normal;
    }

    h1 {
        font-size: var(--font-size-xl);
    }

    h2 {
        font-size: 22px;
    }

    h3 {
        font-size: var(--font-size-l);
    }

    h4,
    h5,
    h6 {
        font-size: var(--font-size-m);
    }

    p {
        font-size: var(--font-size-xs);
        line-height: var(--line-height-sm);
        color: var(--color-darkgray-200);
    }
}
</style>
