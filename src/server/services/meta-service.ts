import { InternalServerException, NotFoundException } from '../modules/misc/custom-errors.js';
import { dataSource } from '../database/datasource.js';
import { Like } from 'typeorm';
import { Meta } from '../database/entities/Meta.js';
import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router';
import { z as zod } from 'zod';

// eslint-disable-next-line complexity -- it is intended to be complex
const getMetaDataTags = async (currentRoute: RouteLocationNormalizedLoadedGeneric): Promise<string> => {
	let metaTags = '';

	let canonicalUrl = currentRoute.fullPath;
	if (currentRoute.query.page === '0') canonicalUrl = currentRoute.path;

	metaTags += `<link rel="canonical" href="${process.env.URL}${canonicalUrl}">`;
	metaTags += `<meta property="og:url" content="${process.env.URL}${canonicalUrl}">`;
	metaTags += `<meta name="twitter:url" content="${process.env.URL}${canonicalUrl}">`;

	let technicalName = currentRoute.name;
	if (typeof technicalName !== 'string') return metaTags;
	if (typeof currentRoute.params.technicalName === 'string') technicalName = currentRoute.params.technicalName;

	const metaData = await dataSource.getRepository(Meta).findOneBy({
		page: {
			// eslint-disable-next-line new-cap -- this is not a constructor
			technicalName: Like(technicalName),
		},
	});

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

const ResponseMetaValidator = zod.object({
	createdAt: zod.date(),
	description: zod.string(),
	identifier: zod.string().uuid(),
	image: zod.string().url().nullish(),
	title: zod.string(),
	type: zod.string().nullish(),
	updatedAt: zod.date().nullish(),
});

const getMetaData = async ({ technicalName }: { technicalName: string }) => {
	const metaData = await dataSource.getRepository(Meta).findOneBy({
		page: {
			// eslint-disable-next-line new-cap -- this is not a constructor
			technicalName: Like(technicalName),
		},
	});

	if (!metaData) throw new NotFoundException(`Meta data for: "${technicalName}" not found`);
	const result = ResponseMetaValidator.safeParse(metaData);
	if (!result.success) throw new InternalServerException(`Failed to validate meta data for: ${technicalName}`, { cause: result.error.errors });

	return result.data;
};

export { getMetaData, getMetaDataTags };
