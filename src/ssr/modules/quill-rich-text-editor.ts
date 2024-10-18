import type { ImageData } from 'quill-image-drop-and-paste';
import type Quill from 'quill';
import type { QuillOptions } from 'quill';
import type Toolbar from 'quill/modules/toolbar';
const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const imageHandler = async (quill: Quill, imageData: ImageData) => {
	const file = imageData.toFile();
	if (!file) throw new Error('Could not convert image data to file');

	const formData = new FormData();
	formData.append('file', file);
	formData.append('type', imageData.type);

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
			let fileInput = this.container?.querySelector('input.ql-image[type=file]') as HTMLInputElement | null;
			if (fileInput == null) {
				fileInput = document.createElement('input');
				fileInput.setAttribute('type', 'file');
				fileInput.setAttribute(
					'accept',
					'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
				);
				fileInput.classList.add('ql-image');
				fileInput.addEventListener('change', function (changeEvent) {
					if (!(changeEvent.target instanceof HTMLInputElement)) throw new Error('Change event target is not an input element');
					const files = changeEvent.target.files;
					if (typeof files?.length !== 'undefined' && files.length > 0) {
						const file = files[0];
						const type = file.type;
						const reader = new FileReader();
						reader.onload = async (event) => {
							// Handle the inserted image
							const dataUrl = event.target?.result;
							if (typeof dataUrl !== 'string') throw new Error('Data URL is not a string');
							const ImageDataConstructor = (await import('quill-image-drop-and-paste')).ImageData;
							await imageHandler(quill, new ImageDataConstructor(dataUrl, type, file.name));
							if (fileInput) fileInput.value = '';
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
	const imageDropAndPaste = quill.getModule('imageDropAndPaste');
	if (!(imageDropAndPaste instanceof QuillImageDropAndPaste)) throw new Error('Missing QuillImageDropAndPaste');
	imageDropAndPaste.option.handler = async (_imageDataUrl: string | ArrayBuffer, _type?: string, imageData?: ImageData) => {
		if (imageData) await imageHandler(quill, imageData);
		else throw new Error('Image data is missing');
	};

	const toolbar = quill.getModule('toolbar') as Toolbar;
	nativeImageHandlerOverwrite(toolbar);

	return quill;
};

export { getQuillDefaultOptions, removeQuillInstance, getQuillRichTextEditorInstance };
