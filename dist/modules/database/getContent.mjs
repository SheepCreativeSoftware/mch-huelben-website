import { getConnection } from './connectDatabase.mjs';
const getContent = async (page) => {
    const conn = await getConnection();
    const content = await conn.query(`SELECT 
		id, type, content, description, created, updated 
		FROM content WHERE page = ? 
		ORDER BY created DESC`, [page]);
    return content;
};
export { getContent };
