import { ContentType } from '../types/ContentType.mjs';
import { UUID } from 'crypto';

interface ContentDB {
	id: UUID,
	page: string,
	type: ContentType,
	content: string,
	created: string,
	updated: string,
}

interface MetaDataDB {
	title: string,
	keywords: string,
	description: string,
}

export { ContentDB, MetaDataDB };
