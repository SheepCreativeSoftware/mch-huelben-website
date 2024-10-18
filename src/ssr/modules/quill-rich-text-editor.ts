import type { ImageData } from 'quill-image-drop-and-paste';
import type Quill from 'quill';
import type { QuillOptions } from 'quill';
import type Toolbar from 'quill/modules/toolbar';
const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const getQuillRichTextEditor = async () => {
	if (import.meta.env.SSR) throw new Error('Quill cannot be loaded in a server environment');
	// Dynamic import is used because Quill can only be loaded in the browser
	return (await import('quill')).default;
};

const imageHandler = async (quill: Quill, imageData: ImageData) => {
	const file = imageData.toFile();

	// Generate a form data
	const formData = new FormData();

	// Or just append the file
	if (file) formData.append('file', file);
	formData.append('type', imageData.type);

	// Upload image to your server
	const url = new URL('/api/file/upload', baseUrl);
	const result = await fetch(url, {
		body: formData,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		method: 'POST',
	});

	if (!result.ok) throw new Error('Could not upload image');

	const body = await result.json();
	const fileUrl = body.filePaths[0];

	/*
	 * Success? you should return the uploaded image's url
	 * Then insert into the quill editor
	 */
	let index = quill.getSelection()?.index;
	if (typeof index === 'undefined' || index < 0) index = quill.getLength();
	quill.insertEmbed(index, 'image', fileUrl, 'user');
};

const nativeImageHandlerOverwrite = (toolbar: Toolbar) => {
	toolbar.addHandler('image', function (this: Toolbar, clicked: boolean) {
		if (clicked) {
			// eslint-disable-next-line no-invalid-this -- this is a given mechanism of quill
			const quill = this.quill;
			// eslint-disable-next-line no-invalid-this -- this is a given mechanism of quill
			let fileInput = this.container?.querySelector('input.ql-image[type=file]');
			if (fileInput == null) {
				fileInput = document.createElement('input');
				fileInput.setAttribute('type', 'file');
				fileInput.setAttribute(
					'accept',
					'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
				);
				fileInput.classList.add('ql-image');
				fileInput.addEventListener('change', function (changeEvent) {
					const files = changeEvent.target?.files;
					let file;
					if (files.length > 0) {
						file = files[0];
						const type = file.type;
						const reader = new FileReader();
						reader.onload = async (event) => {
							// Handle the inserted image
							const dataUrl = event.target?.result;
							if (typeof dataUrl !== 'string') throw new Error('Data URL is not a string');
							const ImageDataConstructor = (await import('quill-image-drop-and-paste')).ImageData;
							await imageHandler(quill, new ImageDataConstructor(dataUrl, type, file.name));
							fileInput.value = '';
						};
						reader.readAsDataURL(file);
					}
				});
			}
			fileInput.click();
		}
	});
};

const getQuillToolbarOptions = () => {
	return [
		[
			'bold', 'italic', 'underline', 'strike',
		],
		['blockquote', 'code-block'],
		['link', 'image'],
		[{ 'header': 3 }, { 'header': 4 }, { 'header': 5 }],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }],
		[{ 'indent': '-1' }, { 'indent': '+1' }],
		[{ 'align': [] }],
		['clean'],
	];
};

const getQuillDefaultOptions = (): QuillOptions => {
	return {
		formats: [
			'align',
			'bold',
			'blockquote',
			'code',
			'code-block',
			'header',
			'indent',
			'image',
			'list',
			'italic',
			'link',
			'strike',
			'underline',
		],
		modules: {
			imageDropAndPaste: {
				// Add an custom image handler
				handler: imageHandler,
			},
			toolbar: getQuillToolbarOptions(),
		},
		placeholder: 'Text eingeben...',
		theme: 'snow',
	};
};

const removeQuillInstance = (quillInstance: Quill) => {
	// @ts-expect-error -- quillInstance theme modules toolbar container is private
	quillInstance.theme.modules.toolbar?.container?.remove();
	quillInstance.deleteText(0, quillInstance.getLength());
	quillInstance.disable();
	quillInstance.container.remove();
};

const getQuillRichTextEditorInstance = async (selector: HTMLElement | string) => {
	if (import.meta.env.SSR) throw new Error('Quill cannot be loaded in a server environment');
	// Dynamic import is used because Quill can only be loaded in the browser
	const QuillRichTextEditor = (await import('quill')).default;
	const QuillImageDropAndPaste = (await import('quill-image-drop-and-paste')).default;

	QuillRichTextEditor.register('modules/imageDropAndPaste', QuillImageDropAndPaste);
	const quill = new QuillRichTextEditor(selector, getQuillDefaultOptions());
	const imageDropAndPaste = quill.getModule('imageDropAndPaste') as QuillImageDropAndPaste;
	imageDropAndPaste.option.handler = (imageDataUrl: string, type: string, imageData: ImageData) => imageHandler(quill, imageData);
	const toolbar = quill.getModule('toolbar') as Toolbar;
	nativeImageHandlerOverwrite(toolbar);

	return quill;
};

export { getQuillRichTextEditor, getQuillDefaultOptions, removeQuillInstance, getQuillRichTextEditorInstance };
