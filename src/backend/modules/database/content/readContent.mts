import { ContentDB } from '../../../interfaces/Database.mjs';
import { getConnection } from '../connectDatabase.mjs';

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

export { getContent, getContentNews };
