import { MetaRepository } from '../database/repository/meta-repository.js';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';

const getMetaData = async (currentRoute: RouteLocationNormalizedLoadedGeneric): Promise<string> => {
	let metaTags = '';

	const canonicalUrl = currentRoute.fullPath;
	metaTags += `<link rel="canonical" href="${process.env.URL}${canonicalUrl}">`;
	metaTags += `<meta property="og:url" content="${process.env.URL}${canonicalUrl}">`;
	metaTags += `<meta name="twitter:url" content="${process.env.URL}${canonicalUrl}">`;

	const technicalName = currentRoute.name;

	if (typeof technicalName !== 'string') return metaTags;

	const metaData = await MetaRepository.getMetaByPage(technicalName);

	if (!metaData) return metaTags;

	if (metaData.title) {
		metaTags += `<title>${metaData.title}</title>`;
		metaTags += `<meta property="og:title" content="${metaData.title}">`;
		metaTags += `<meta name="twitter:title" content="${metaData.title}">`;
	}
	if (metaData.description) {
		metaTags += `<meta name="description" content="${metaData.description}">`;
		metaTags += `<meta property="og:description" content="${metaData.description}">`;
		metaTags += `<meta name="twitter:description" content="${metaData.description}">`;
	}

	if (metaData.type) metaTags += `<meta property="og:type" content="${metaData.type}">`;

	if (metaData.type === 'article') metaTags += `<meta property="article:published_time" content="${metaData.createdAt.toISOString()}">`;

	if (metaData.type === 'article' && metaData.updatedAt) {
		// This is otherwise to long for a single line
		metaTags += `<meta property="article:modified_time" content="${metaData.updatedAt.toISOString()}">`;
	}

	if (metaData.image) {
		metaTags += `<meta property="og:image" content="${process.env.URL}${metaData.image}">`;
		metaTags += `<meta name="twitter:image" content="${process.env.URL}${metaData.image}">`;
	}

	return metaTags;
};

export { getMetaData };
