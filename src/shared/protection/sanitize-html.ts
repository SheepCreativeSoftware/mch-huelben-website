import DOMPurify from 'isomorphic-dompurify';

const sanitizeHtml = (dirtyHtml: string): string => {
	const cleanHtml = DOMPurify.sanitize(dirtyHtml, {
		ALLOW_UNKNOWN_PROTOCOLS: false,
		RETURN_DOM: false,
		RETURN_DOM_FRAGMENT: false,
		RETURN_TRUSTED_TYPE: false,
		USE_PROFILES: { html: true },
	});

	return cleanHtml;
};

export { sanitizeHtml };
