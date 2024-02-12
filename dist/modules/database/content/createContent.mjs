import { getConnection } from '../connectDatabase.mjs';
// eslint-disable-next-line id-length
const addContent = async (page, type, content = '') => {
    const conn = await getConnection();
    await conn.query('INSERT INTO content (page, type, content) VALUES (?, ?, ?)', [
        page,
        type,
        content,
    ]);
};
export { addContent };
