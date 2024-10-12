import type Quill from 'quill';
import type { QuillOptions } from 'quill';

const getQuillRichTextEditor = async () => {
	if (import.meta.env.SSR) throw new Error('Quill cannot be loaded in a server environment');
	// Dynamic import is used because Quill can only be loaded in the browser
	return (await import('quill')).default;
};

const getQuillToolbarOptions = () => {
	return [
		[
			'bold', 'italic', 'underline', 'strike',
		],
		['blockquote', 'code-block'],
		['link'],
		[{ 'header': 2 }, { 'header': 3 }, { 'header': 4 }],
		[{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
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

export { getQuillRichTextEditor, getQuillDefaultOptions, removeQuillInstance };
