import { getConnection } from '../connectDatabase.mjs';
import { MetaDataDB } from '../../../interfaces/Database.mjs';
import { UUID } from 'crypto';

const zero = 0;
const getMetaData = async (page: string) => {
	const conn = await getConnection();
	const metaData = await conn.query('SELECT title, keywords, description FROM meta WHERE page = ? LIMIT 1', [page]) as MetaDataDB[] | undefined[];
	return metaData[zero];
};

const getMetaDataId = async (page: string) => {
	const conn = await getConnection();
	const metaData = await conn.query('SELECT id FROM meta WHERE page = ? LIMIT 1', [page]) as { id: UUID }[] | undefined[];
	if(typeof metaData[zero] === 'undefined') return null;
	return metaData[zero].id;
};

export { getMetaData, getMetaDataId };
