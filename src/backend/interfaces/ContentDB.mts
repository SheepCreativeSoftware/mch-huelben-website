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

export { ContentDB };
