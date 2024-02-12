import { getConnection } from '../connectDatabase.mjs';
import { getMetaDataId } from './getMetaData.mjs';
const setMetaData = async ({ metaData, page }) => {
    // Clean input
    const copyMetaData = {};
    copyMetaData.description = String(metaData.description).replaceAll('"', '');
    copyMetaData.keywords = String(metaData.keywords).replaceAll('"', '');
    copyMetaData.title = String(metaData.title);
    const metaId = await getMetaDataId(page);
    const conn = await getConnection();
    if (metaId === null) {
        await conn.query('INSERT INTO meta (page, title, keywords, description) VALUES (?, ?, ?, ?)', [
            page,
            copyMetaData.title,
            copyMetaData.keywords,
            copyMetaData.description,
        ]);
    }
    else {
        await conn.query('UPDATE meta SET title = ?, keywords = ?, description = ? WHERE page=? AND id=?', [
            copyMetaData.title,
            copyMetaData.keywords,
            copyMetaData.description,
            page,
            metaId,
        ]);
    }
};
export { setMetaData };
