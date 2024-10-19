import Cookie from 'js-cookie';

const gmapsLinkConsentChangedEvent = new Event('gmaps-link-consent-changed');

const hasGoogleMapsLink = (url: string) => {
	return url.includes('google.com/maps/embed');
};

const replaceLinkWithIframe = (link: Element, googleMapsUrl: string) => {
	const videoBox = document.createElement('div');
	videoBox.classList.add('gmaps-box');

	const iframe = document.createElement('iframe');
	iframe.setAttribute('src', googleMapsUrl);
	iframe.setAttribute('frameborder', '0');
	iframe.setAttribute('allowfullscreen', 'true');
	iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
	iframe.style.maxWidth = '100%';
	iframe.style.height = '400px';
	iframe.style.width = '100%';
	videoBox.appendChild(iframe);

	const privacyLink = document.createElement('a');
	privacyLink.textContent = 'Datenschutzseite';
	privacyLink.setAttribute('href', '/datenschutz#cookie-einstellungen');

	const privacyNotice = document.createElement('p');
	privacyNotice.textContent = 'Dieses Element enthält Daten von Google Maps. Sie können die Einbettung solcher Inhalte auf unserer ';
	privacyNotice.appendChild(privacyLink);
	privacyNotice.appendChild(document.createTextNode(' blockieren.'));

	videoBox.appendChild(privacyNotice);

	link.replaceWith(videoBox);
};

const replaceWithConsentBox = (link: Element, videoUrl: string) => {
	const consentBox = document.createElement('div');
	consentBox.classList.add('consent-box');

	const privacyLink = document.createElement('a');
	privacyLink.textContent = 'Datenschutzerklärung';
	privacyLink.setAttribute('href', '/datenschutz');

	const consentHeading = document.createElement('h4');
	consentHeading.textContent = 'Google Maps Einbettung';
	consentBox.appendChild(consentHeading);

	const consentText = document.createElement('p');
	consentText.textContent = `Zum Schutz Ihrer persönlichen Daten ist die Verbindung zu Google Maps blockiert.
		Klicken Sie auf den folgenden Link, um die Karte zu laden.
		Durch das Laden der Karte akzeptieren Sie die Datenschutzbestimmungen von Google Maps.
		Details in unserer `;
	consentText.appendChild(privacyLink);
	consentText.appendChild(document.createTextNode('.'));
	consentBox.appendChild(consentText);

	const consentButton = document.createElement('button');
	consentButton.textContent = 'Ich stimme zu';
	consentButton.addEventListener('click', () => {
		replaceLinkWithIframe(consentBox, videoUrl);
		Cookie.set('consent-gmaps', 'true', { expires: 365 });
		document.dispatchEvent(gmapsLinkConsentChangedEvent);
	});

	consentBox.appendChild(consentButton);

	document.addEventListener('gmaps-link-consent-changed', () => {
		replaceLinkWithIframe(consentBox, videoUrl);
	});

	link.replaceWith(consentBox);
};

const searchForGoogleMapsLinks = (referenceElement: Element) => {
	const links = referenceElement.querySelectorAll('a');
	for (const link of links) {
		const url = link.getAttribute('href');
		if (url == null) continue;

		if (!hasGoogleMapsLink(url)) continue;

		const isConsentGiven = Cookie.get('consent-gmaps');

		if (isConsentGiven) replaceLinkWithIframe(link, url);
		else replaceWithConsentBox(link, url);
	}
};

const removeGoogleMapsConsentCookie = () => {
	Cookie.remove('consent-gmaps');
};

const toggleGmapsConsentCookie = (newValue: boolean) => {
	if (newValue) Cookie.set('consent-gmaps', 'true', { expires: 365 });
	else Cookie.remove('consent-gmaps');
	document.dispatchEvent(gmapsLinkConsentChangedEvent);
};

const getGoogleMapsConsentCookie = () => {
	return Boolean(Cookie.get('consent-gmaps'));
};

export { getGoogleMapsConsentCookie, searchForGoogleMapsLinks, toggleGmapsConsentCookie, removeGoogleMapsConsentCookie };
