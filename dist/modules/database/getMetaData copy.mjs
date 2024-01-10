import { getConnection } from './connectDatabase.mjs';
const zero = 0;
const getMetaData = async (page) => {
    const conn = await getConnection();
    const metaData = await conn.query('SELECT title, keywords, description FROM meta WHERE page = ? LIMIT 1', [page]);
    return metaData[zero];
};
const getMetaDataId = async (page) => {
    const conn = await getConnection();
    const metaData = await conn.query('SELECT id FROM meta WHERE page = ? LIMIT 1', [page]);
    if (typeof metaData[zero] === 'undefined')
        return null;
    return metaData[zero].id;
};
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
export { getMetaData, setMetaData };
