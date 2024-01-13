import { getConnection } from './connectDatabase.mjs';
const getContent = async (page) => {
    const conn = await getConnection();
    const content = await conn.query(`SELECT 
		id, type, content, created, updated 
		FROM content WHERE page = ? 
		ORDER BY created`, [page]);
    return content;
};
const zero = 0;
const getContentNews = async (limit = 10, offset = 0) => {
    const conn = await getConnection();
    if (offset === zero) {
        const content = await conn.query(`SELECT 
			id, type, content, created, updated 
			FROM content WHERE page = 'news' 
			ORDER BY created DESC LIMIT ?`, [limit]);
        return content;
    }
    const content = await conn.query(`SELECT 
		id, type, content, created, updated 
		FROM content WHERE page = 'news' 
		ORDER BY created DESC LIMIT ? OFFSET ?`, [limit, offset]);
    return content;
};
// eslint-disable-next-line id-length
const setContent = async (page, type, content, id) => {
    const conn = await getConnection();
    await conn.query('UPDATE content SET content = ? WHERE page=? AND id=?', [
        content,
        page,
        id,
    ]);
};
// eslint-disable-next-line id-length
const addContent = async (page, type, content = '') => {
    const conn = await getConnection();
    await conn.query('INSERT INTO content (page, type, content) VALUES (?, ?, ?)', [
        page,
        type,
        content,
    ]);
};
// eslint-disable-next-line id-length
const removeContent = async (page, id) => {
    const conn = await getConnection();
    await conn.query('DELETE FROM content WHERE id=? AND page=?', [
        id,
        page,
    ]);
};
export { addContent, getContent, getContentNews, removeContent, setContent };
