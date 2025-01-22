<!-- eslint-disable vue/multi-word-component-names -->
<template>
	<div>
		<div class="header-container">
			<div class="head-image">
				<img
					src="../assets/overall/overall-1.png"
					alt="Overall Image"
				>
			</div>
		</div>
		<main>
			<MainArticleBase v-if="gallery !== null">
				<template #title>
					{{ gallery.title }}
				</template>
				<template #text>
					{{ gallery.description }}
				</template>
				<template #additional>
					<div class="image-collection-container">
						<div
							v-for="images in imagesCollection"
							:key="'group-' + images[0].identifier"
							class="image-collection"
						>
							<img
								v-for="(image, index) in images"
								:key="image.identifier"
								:class="`image-item-${index}`"
								:src="image.imageUrl"
								:alt="image.description"
								:title="image.description"
								loading="lazy"
								@click="showZoomedImage(image)"
							>
						</div>
					</div>
				</template>
			</MainArticleBase>
		</main>
		<dialog
			ref="zoomedImageDialog"
			class="zoomed-image-dialog"
			@click="closeZoomedImage"
		>
			<img alt="Kein Bild">
		</dialog>
	</div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, onMounted, onServerPrefetch, useTemplateRef } from 'vue';
import MainArticleBase from '../components/base/MainArticleBase.vue';
import { routeOnError } from '../modules/route-on-error.ts';
import { useGalleryStore } from '../stores/gallery-store.ts';
import { useRouter } from 'vue-router';

const MAX_IMAGES_PER_COLLECTION = 12;
const galleryStore = useGalleryStore();
const router = useRouter();

const zoomedImageDialog = useTemplateRef<HTMLDialogElement>('zoomedImageDialog');

const showZoomedImage = (image: {
	description: string;
	fileType: string | null;
	imageUrl: string;
}) => {
	if (!(zoomedImageDialog.value instanceof HTMLDialogElement)) return;

	const img = zoomedImageDialog.value.querySelector('img');
	if (!(img instanceof HTMLImageElement)) return;
	img.src = image.imageUrl;
	img.alt = image.description;
	img.title = image.description;

	zoomedImageDialog.value.showModal();
};

const closeZoomedImage = () => {
	if (!(zoomedImageDialog.value instanceof HTMLDialogElement)) return;

	zoomedImageDialog.value.close();
};

const technicalName = router.currentRoute.value.params.technicalName;
const category = router.currentRoute.value.params.category;
if (typeof technicalName !== 'string') throw new Error('No technical name provided');
if (typeof category !== 'string') throw new Error('No category provided');

const gallery = computed(() => {
	return galleryStore.getGallery(category, technicalName);
});

const imagesCollection = computed(() => {
	const images = gallery.value?.images ?? [];
	return Array.from(images, () => images.splice(0, MAX_IMAGES_PER_COLLECTION));
});

const updateGalleries = async () => {
	try {
		await galleryStore.fetchGalleryData();
	} catch (error) {
		if (error instanceof Error) {
			await routeOnError(router, error);
			return;
		}
		// eslint-disable-next-line no-console -- unknown error handling
		console.error(error);
	}
};

onBeforeMount(async() => {
	await updateGalleries();
	if (!gallery.value) await router.replace({ name: 'not-found', replace: true });
});

onServerPrefetch(async ()=>{
	if (!gallery.value) await router.replace({ name: 'not-found', replace: true });
});

onMounted(() => {
	closeZoomedImage();
});
</script>

<style lang="css" scoped>
.head-image img {
	object-fit: cover;
	width: 100%;
	max-height: 45vh;
}

.image-collection-container {
	display: grid;
	gap: var(--space-200);
}

.image-collection {
	display: grid;
	gap: var(--space-200);
	grid-template-areas:
		'a a b b c c d d e e'
		'f f f f f f f f f f'
		'g g g g h h h h h h'
		'g g g g h h h h h h'
		'i i j j h h h h h h'
		'k k k k k l l l l l';

	img {
		aspect-ratio: 2 / 1;

		&:hover {
			cursor: zoom-in;
		}
	}
}

.image-collection:nth-child(even) {
	grid-template-areas:
		'a a b b c c d d e e'
		'f f f f f f f f f f'
		'g g g g g g h h h h'
		'g g g g g g h h h h'
		'g g g g g g i i j j'
		'k k k k k l l l l l';
}

@media(width <= 800px) {
	.image-collection, .image-collection:nth-child(even) {
		grid-template-areas:
			'a a b b c c'
			'd d d e e e'
			'f f f f f f'
			'g g h h i i'
			'j j j k k k'
			'l l l l l l';
	}
}

@media(width <= 700px) {
	.image-collection, .image-collection:nth-child(even) {
		grid-template-areas:
			'a a b b'
			'c c c c'
			'd d e e'
			'f f f f'
			'g g h h'
			'i i i i'
			'j j k k'
			'l l l l';
	}
}

.image-item-0 {
	grid-area: a;
}
.image-item-1 {
	grid-area: b;
}
.image-item-2 {
	grid-area: c;
}
.image-item-3 {
	grid-area: d;
}
.image-item-4 {
	grid-area: e;
}
.image-item-5 {
	grid-area: f;
}
.image-item-6 {
	grid-area: g;
}
.image-item-7 {
	grid-area: h;
}
.image-item-8 {
	grid-area: i;
}
.image-item-9 {
	grid-area: j;
}
.image-item-10 {
	grid-area: k;
}
.image-item-11 {
	grid-area: l;
}

.zoomed-image-dialog {
	display: flex;
	width: 100vw;
	height: 100vh;
	transition: all 0.5s ease-in-out;
	background: rgba(0, 0, 0, 0.8);

	img {
		margin: 0 auto;
		max-width: 100%;
		max-height: 100%;
	}

	&:not([open]) {
		opacity: 0;
		pointer-events: none;
	}

	&[open] {
		opacity: 1;
		cursor: zoom-out;
	}
}
</style>
