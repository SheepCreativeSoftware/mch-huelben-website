import type Quill from 'quill';
import type { QuillOptions } from 'quill';
import type Toolbar from 'quill/modules/toolbar';
import type Uploader from 'quill/modules/uploader';
const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;

const createFileInputElement = (): HTMLInputElement => {
	const fileInput = document.createElement('input');
	fileInput.setAttribute('type', 'file');
	fileInput.setAttribute(
		'accept',
		'image/png, image/gif, image/jpeg, image/bmp, image/x-icon',
	);
	fileInput.setAttribute('multiple', 'true');
	fileInput.classList.add('ql-image');

	return fileInput;
};

const uploadFiles = async (files: FileList | File[]): Promise<string[]> => {
	const formData = new FormData();
	for (const file of files) formData.append('file', file);

	const url = new URL('/api/file/upload', baseUrl);
	const result = await fetch(url, {
		body: formData,
		headers: {
			Authorization: `Bearer ${localStorage.getItem('token')}`,
		},
		method: 'POST',
	});

	const body = await result.json();
	if (!result.ok) throw new Error(`${body.message}`);

	return body.filePaths as string[];
};

const dropImageInEditor = (quill: Quill, filePaths: string[]): void => {
	for (const filePath of filePaths) {
		const index = quill.getSelection()?.index;
		if (typeof index === 'undefined' || index < 0) quill.insertEmbed(quill.getLength(), 'image', filePath, 'user');
		else quill.insertEmbed(index, 'image', filePath, 'user');
	}
};

const filesAddedEventHandler = async (quill: Quill, event: Event) => {
	if (!(event.target instanceof HTMLInputElement)) return;
	const fileInput = event.target;
	const files = fileInput.files;
	if (files == null) return;

	try {
		const filePaths = await uploadFiles(files);
		dropImageInEditor(quill, filePaths);
		fileInput.value = '';
	} catch (error) {
		// eslint-disable-next-line no-alert -- simple notification to the user
		if (error instanceof Error) alert(`Could not upload image: ${error.message}`);
	}
};

const nativeImageHandlerOverwrite = (toolbar: Toolbar) => {
	toolbar.addHandler('image', function (this: Toolbar, clicked: boolean) {
		if (clicked) {
			// eslint-disable-next-line no-invalid-this -- this is a given mechanism of quill
			const quill = this.quill;
			// eslint-disable-next-line no-invalid-this -- this is a given mechanism of quill
			let fileInput = this.container?.querySelector('input.ql-image[type=file]') as HTMLInputElement | null;
			if (fileInput == null) {
				// At initial load there is no file input, so we create it
				fileInput = createFileInputElement();
				fileInput.addEventListener('change', (event) => filesAddedEventHandler(quill, event));
			}

			// Open file dialog
			fileInput.click();
		}
	});
};

const nativeUploaderOverwrite = (uploader: Uploader) => {
	uploader.upload = async function (this, _range, files) {
		try {
			const filePaths = await uploadFiles(files);
			dropImageInEditor(this.quill, filePaths);
		} catch (error) {
			// eslint-disable-next-line no-alert -- simple notification to the user
			if (error instanceof Error) alert(`Could not upload image: ${error.message}`);
		}
	};
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

const getQuillDefaultOptions = (containerSelector?: string | HTMLElement | null): QuillOptions => {
	return {
		bounds: containerSelector,
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

const getQuillRichTextEditorInstance = async (selector: HTMLElement | string, containerSelector?: HTMLElement | string) => {
	if (import.meta.env.SSR) throw new Error('Quill cannot be loaded in a server environment');
	// Dynamic import is used because Quill can only be loaded in the browser
	const QuillRichTextEditor = (await import('quill')).default;

	const quill = new QuillRichTextEditor(selector, getQuillDefaultOptions(containerSelector));
	const toolbar = quill.getModule('toolbar') as Toolbar;
	nativeImageHandlerOverwrite(toolbar);

	const uploader = quill.getModule('uploader') as Uploader;
	nativeUploaderOverwrite(uploader);

	return quill;
};

export { getQuillDefaultOptions, removeQuillInstance, getQuillRichTextEditorInstance };
