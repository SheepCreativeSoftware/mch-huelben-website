import { getConnection } from '../connectDatabase.mjs';
// eslint-disable-next-line id-length
const removeContent = async (page, id) => {
    const conn = await getConnection();
    await conn.query('DELETE FROM content WHERE id=? AND page=?', [
        id,
        page,
    ]);
};
export { removeContent };
