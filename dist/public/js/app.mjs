const scrollSmothToTarget = (anchorId) => {
    const targetElement = document.querySelector(anchorId);
    if (targetElement)
        targetElement.scrollIntoView({ behavior: 'smooth' });
};
const scrollTopButton = document.getElementById('top');
const loginButton = document.getElementById('login');
let loginMessage = document.getElementById('login-message');
loginButton?.addEventListener('submit', async (_event) => {
    _event.preventDefault();
    if (_event.target instanceof HTMLFormElement) {
        const email = new FormData(_event.target).get('email');
        const response = await fetch('/user/login', {
            body: JSON.stringify({ destination: email, name: 'Login' }),
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
        });
        const result = await response.json();
        if (loginMessage === null) {
            loginMessage = document.createElement('p');
            const parentNode = _event.target.parentNode;
            parentNode.prepend(loginMessage);
        }
        if (response.ok && result.success)
            loginMessage.innerText = 'Prüfe deine E-mails, um dich einzuloggen.';
        else
            loginMessage.innerText = 'Fehler beim einloggen. Bitte versuche es noch einmal.';
    }
});
const getCsrfToken = () => {
    const tokenElement = document.getElementsByName('CSRFToken')[0];
    let csrfToken = 'null';
    if (tokenElement instanceof HTMLInputElement)
        csrfToken = tokenElement.value;
    return csrfToken || 'null';
};
const pageForms = document.getElementsByClassName('page-form');
for (const pageForm of pageForms) {
    if (pageForm instanceof HTMLFormElement) {
        pageForm.addEventListener('submit', async (_event) => {
            _event.preventDefault();
            if (_event.target instanceof HTMLFormElement) {
                const formData = new FormData(_event.target);
                const bodyObject = {};
                for (const [key, value] of formData.entries())
                    Object.assign(bodyObject, { [key]: value });
                const response = await fetch(_event.target.action, {
                    body: JSON.stringify(bodyObject),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-csrf-token': getCsrfToken(),
                    },
                    method: 'POST',
                });
                if (response.redirected)
                    window.open(response.url);
                if (!response.ok) {
                    // ...
                    // eslint-disable-next-line no-alert
                    alert(`Fehler bei Aktion: ${response.status} - ${response.statusText}`);
                }
            }
        });
    }
}
export {};
