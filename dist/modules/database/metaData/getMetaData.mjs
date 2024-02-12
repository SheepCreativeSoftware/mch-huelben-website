import { getConnection } from '../connectDatabase.mjs';
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
export { getMetaData, getMetaDataId };
