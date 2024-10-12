import DOMPurify from 'isomorphic-dompurify';

const ALLOWED_ATTR = ['href'];
const ALLOWED_TAGS = [
	'a', 'b', 'blockquote', 'code', 'em', 'i', 'li', 'ol', 'p', 'strong', 'ul',
];
const ALLOW_DATA_ATTR = false;

const sanitizeHtml = (dirtyHtml: string): string => {
	return DOMPurify.sanitize(dirtyHtml, {
		ALLOWED_ATTR,
		ALLOWED_TAGS,
		ALLOW_DATA_ATTR,
		ALLOW_UNKNOWN_PROTOCOLS: false,
		RETURN_DOM: false,
		RETURN_DOM_FRAGMENT: false,
		RETURN_TRUSTED_TYPE: false,
		USE_PROFILES: { html: true },
	});
};

export { sanitizeHtml };
