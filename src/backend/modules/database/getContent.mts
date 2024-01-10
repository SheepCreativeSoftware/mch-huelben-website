import { ContentDB } from '../../interfaces/ContentDB.mjs';
import { getConnection } from './connectDatabase.mjs';

const getContent = async (page: string) => {
	const conn = await getConnection();
	const content = await conn.query(`SELECT 
		id, type, content, description, created, updated 
		FROM content WHERE page = ? 
		ORDER BY created DESC`, [page]) as ContentDB[] | undefined[];

	return content;
};

export { getContent };
