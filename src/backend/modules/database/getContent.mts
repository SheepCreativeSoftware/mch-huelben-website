import { ContentDB } from '../../interfaces/ContentDB.mjs';
import { ContentType } from '../../types/ContentType.mjs';
import { getConnection } from './connectDatabase.mjs';
import { UUID } from 'crypto';

const getContent = async (page: string) => {
	const conn = await getConnection();
	const content = await conn.query(`SELECT 
		id, type, content, created, updated 
		FROM content WHERE page = ? 
		ORDER BY created`, [page]) as ContentDB[] | undefined[];

	return content;
};

const zero = 0;
const getContentNews = async (limit: number =10, offset: number =0): Promise<ContentDB[] | undefined[]> => {
	const conn = await getConnection();
	if(offset === zero) {
		const content = await conn.query(`SELECT 
			id, type, content, created, updated 
			FROM content WHERE page = 'news' 
			ORDER BY created DESC LIMIT ?`, [limit]) as ContentDB[] | undefined[];
		return content;
	}
	const content = await conn.query(`SELECT 
		id, type, content, created, updated 
		FROM content WHERE page = 'news' 
		ORDER BY created DESC LIMIT ? OFFSET ?`, [limit, offset]) as ContentDB[] | undefined[];
	return content;
};

// eslint-disable-next-line id-length
const setContent = async (page: string, type: ContentType, content: string, id: UUID | 'none') => {
	const conn = await getConnection();

	if(id === 'none') {
		await conn.query('INSERT INTO content (page, type, content) VALUES (?, ?, ?)', [
			page,
			type,
			content,
		]);
	} else {
		await conn.query('UPDATE content SET content = ? WHERE page=? AND id=?', [
			content,
			page,
			id,
		]);
	}
};

export { getContent, getContentNews, setContent };
