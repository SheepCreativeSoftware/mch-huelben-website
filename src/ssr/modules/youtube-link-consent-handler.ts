import Cookie from 'js-cookie';

const youtubeLinkConsentChangedEvent = new Event('youtube-link-consent-changed');

const extractVideoUrl = (url: string) => {
	const match2 = (/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtube\.com\/watch.*v=([a-zA-Z0-9_-]+)/.exec(url))
		?? (/^(?:(https?):\/\/)?(?:(?:www|m)\.)?youtu\.be\/([a-zA-Z0-9_-]+)/.exec(url));

	if (match2) return `${match2[1] || 'https'}://www.youtube-nocookie.com/embed/${match2[2]}?showinfo=0`;

	return url;
};

const replaceLinkWithIframe = (link: Element, videoUrl: string) => {
	const videoBox = document.createElement('div');
	videoBox.classList.add('video-box');

	const iframe = document.createElement('iframe');
	iframe.setAttribute('src', videoUrl);
	iframe.setAttribute('frameborder', '0');
	iframe.setAttribute('allowfullscreen', 'true');
	iframe.setAttribute('referrerpolicy', 'no-referrer-when-downgrade');
	iframe.style.maxWidth = '100%';
	iframe.style.height = '400px';
	iframe.style.width = '100%';
	videoBox.appendChild(iframe);

	const privacyLink = document.createElement('a');
	privacyLink.textContent = 'Datenschutzseite';
	privacyLink.setAttribute('href', '/datenschutz');

	const privacyNotice = document.createElement('p');
	privacyNotice.textContent = 'Dieses Element enthält Daten von Youtube. Sie können die Einbettung solcher Inhalte auf unserer ';
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
	consentHeading.textContent = 'YouTube Video Einbettung';
	consentBox.appendChild(consentHeading);

	const consentText = document.createElement('p');
	consentText.textContent = `Zum Schutz Ihrer persönlichen Daten ist die Verbindung zu YouTube blockiert.
		Klicken Sie auf den folgenden Link, um das Video zu laden.
		Durch das Laden des Videos akzeptieren Sie die Datenschutzbestimmungen von YouTube.
		Details in unserer `;
	consentText.appendChild(privacyLink);
	consentText.appendChild(document.createTextNode('.'));
	consentBox.appendChild(consentText);

	const consentButton = document.createElement('button');
	consentButton.textContent = 'Ich stimme zu';
	consentButton.addEventListener('click', () => {
		replaceLinkWithIframe(consentBox, videoUrl);
		Cookie.set('consent-youtube', 'true', { expires: 365 });
		document.dispatchEvent(youtubeLinkConsentChangedEvent);
	});

	consentBox.appendChild(consentButton);
	document.addEventListener('youtube-link-consent-changed', () => {
		replaceLinkWithIframe(consentBox, videoUrl);
	});

	link.replaceWith(consentBox);
};

const searchForYoutubeLinks = (referenceElement: Element) => {
	const links = referenceElement.querySelectorAll('a');
	for (const link of links) {
		const url = link.getAttribute('href');
		if (url == null) continue;

		const videoUrl = extractVideoUrl(url);
		if (videoUrl === url) continue;

		const isConsentGiven = Cookie.get('consent-youtube');

		if (isConsentGiven) replaceLinkWithIframe(link, videoUrl);
		else replaceWithConsentBox(link, videoUrl);
	}
};

const removeYoutubeConsentCookie = () => {
	Cookie.remove('consent-youtube');
};

const toggleYoutubeConsentCookie = (newValue: boolean) => {
	if (newValue) Cookie.set('consent-youtube', 'true', { expires: 365 });
	else Cookie.remove('consent-youtube');
	document.dispatchEvent(youtubeLinkConsentChangedEvent);
};

const getYoutubeConsentCookie = () => {
	return Boolean(Cookie.get('consent-youtube'));
};

export { getYoutubeConsentCookie, searchForYoutubeLinks, toggleYoutubeConsentCookie, removeYoutubeConsentCookie };
