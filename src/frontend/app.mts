import { TrixEditor } from './interfaces/Trix.mjs';

const loginButton = document.getElementById('login') as HTMLButtonElement | null;
let loginMessage = document.getElementById('login-message') as HTMLParagraphElement | null;
loginButton?.addEventListener('submit', async (_event) => {
	_event.preventDefault();
	if(_event.target instanceof HTMLFormElement) {
		const email = new FormData(_event.target).get('email');
		const response = await fetch('/user/login', {
			body: JSON.stringify({ destination: email, name: 'Login' }),
			headers: { 'Content-Type': 'application/json' },
			method: 'POST',
		});
		const result = await response.json();
		if(loginMessage === null){
			loginMessage = document.createElement('p');
			const parentNode = _event.target.parentNode as ParentNode;
			parentNode.prepend(loginMessage);
		}
		if(response.ok && result.success) loginMessage.innerText = 'Prüfe deine E-mails, um dich einzuloggen.';
		else loginMessage.innerText = 'Fehler beim einloggen. Bitte versuche es noch einmal.';
	}
});

const getCsrfToken = () => {
	const tokenElement = document.getElementsByName('CSRFToken')[0];
	let csrfToken = 'null';
	if(tokenElement instanceof HTMLInputElement) csrfToken = tokenElement.value;
	return csrfToken || 'null';
};

const pageForms = document.getElementsByClassName('page-form') as HTMLCollectionOf<Element>;
for(const pageForm of pageForms) {
	if(pageForm instanceof HTMLFormElement) {
		pageForm.addEventListener('submit', async (_event) => {
			_event.preventDefault();
			if(_event.target instanceof HTMLFormElement) {
				const formData = new FormData(_event.target);
				const bodyObject = {};
				for(const [key, value] of formData.entries()) Object.assign(bodyObject, { [key]: value });
				const response = await fetch(_event.target.action, {
					body: JSON.stringify(bodyObject),
					headers: {
						'Content-Type': 'application/json',
						'x-csrf-token': getCsrfToken(),
					},
					method: 'POST',
				});
				if(response.redirected) window.open(response.url, '_self');
				if(!response.ok) {
					// ...
					// eslint-disable-next-line no-alert
					alert(`Fehler bei Aktion: ${response.status} - ${response.statusText}`);
				}
			}
		});
	}
}


const updateTrixToolbarVisibility = () => {
	const trixEditors = document.getElementsByTagName('trix-editor') as HTMLCollectionOf<TrixEditor>;
	for(const trixEditor of trixEditors) {
		const toolBar = trixEditor.toolbarElement;
		if(trixEditor === document.activeElement) toolBar.classList.remove('trix-unfocused');
		else if(!toolBar.contains(document.activeElement)) toolBar.classList.add('trix-unfocused');
	}
};

document.addEventListener('trix-focus', updateTrixToolbarVisibility);
document.addEventListener('trix-initialize', updateTrixToolbarVisibility);
