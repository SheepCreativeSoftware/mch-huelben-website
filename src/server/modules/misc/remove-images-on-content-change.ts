import { buntstift } from 'buntstift';
import { JSDOM } from 'jsdom';
import path from 'node:path';
import { unlink } from 'node:fs/promises';

const removeImagesOnChange = async ({ previousContent, newContent }: { previousContent: string, newContent: string }): Promise<void> => {
	const previousDom = new JSDOM(previousContent);
	const newDom = new JSDOM(newContent);

	const previousImageElements = previousDom.window.document.querySelectorAll('img');
	const newImageElements = newDom.window.document.querySelectorAll('img');

	const imagesToRemove: string[] = [];
	const previousImages = Array.from(previousImageElements).map((element) => element.src);
	const newImages = Array.from(newImageElements).map((element) => element.src);

	for (const previousImage of previousImages) {
		// If the previous image is not in the new images, we need to remove it
		if (!newImages.includes(previousImage)) imagesToRemove.push(previousImage);
	}

	for (const imageToRemove of imagesToRemove) {
		try {
			await unlink(path.resolve(process.cwd(), 'public', imageToRemove));
		} catch (error) {
			if (error instanceof Error) buntstift.error(`Failed to remove image: ${imageToRemove} - ${error.message}`);
		}
	}
};

export { removeImagesOnChange };
