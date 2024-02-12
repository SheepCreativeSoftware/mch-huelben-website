import { getConnection } from '../connectDatabase.mjs';
// eslint-disable-next-line id-length
const setContent = async (page, type, content, id) => {
    const conn = await getConnection();
    await conn.query('UPDATE content SET content = ? WHERE page=? AND id=?', [
        content,
        page,
        id,
    ]);
};
export { setContent };
