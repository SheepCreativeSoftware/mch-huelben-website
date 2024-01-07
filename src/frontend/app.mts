const scrollSmothToTarget = (anchorId: string) => {
	const targetElement = document.querySelector(anchorId);
	if(targetElement) targetElement.scrollIntoView({ behavior: 'smooth' });
};

const scrollTopButton = document.getElementById('top');

const loginButton = document.getElementById('login') as HTMLButtonElement;
let loginMessage = document.getElementById('login-message') as HTMLParagraphElement;

loginButton.addEventListener('submit', async (_event) => {
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