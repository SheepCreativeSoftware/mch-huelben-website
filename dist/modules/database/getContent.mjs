import { getConnection } from './connectDatabase.mjs';
const getContent = async (page) => {
    const conn = await getConnection();
    const content = await conn.query(`SELECT 
		id, type, content, description, created, updated 
		FROM content WHERE page = ? 
		ORDER BY created`, [page]);
    return content;
};
const zero = 0;
const getContentNews = async (limit = 10, offset = 0) => {
    const conn = await getConnection();
    if (offset === zero) {
        const content = await conn.query(`SELECT 
			id, type, content, description, created, updated 
			FROM content WHERE page = news 
			ORDER BY created DESC LIMIT ?`, [limit]);
        return content;
    }
    const content = await conn.query(`SELECT 
		id, type, content, description, created, updated 
		FROM content WHERE page = news 
		ORDER BY created DESC LIMIT ? OFFSET ?`, [limit, offset]);
    return content;
};
export { getContent, getContentNews };
