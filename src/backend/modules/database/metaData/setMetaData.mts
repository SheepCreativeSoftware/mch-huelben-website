import { getConnection } from '../connectDatabase.mjs';
import { getMetaDataId } from './getMetaData.mjs';
import { MetaDataDB } from '../../../interfaces/Database.mjs';

const setMetaData = async ({ metaData, page }: { metaData: MetaDataDB, page: string }) => {
	// Clean input
	const copyMetaData = { } as MetaDataDB;
	copyMetaData.description = String(metaData.description).replaceAll('"', '');
	copyMetaData.keywords = String(metaData.keywords).replaceAll('"', '');
	copyMetaData.title = String(metaData.title);
	const metaId = await getMetaDataId(page);
	const conn = await getConnection();
	if(metaId === null) {
		await conn.query('INSERT INTO meta (page, title, keywords, description) VALUES (?, ?, ?, ?)', [
			page,
			copyMetaData.title,
			copyMetaData.keywords,
			copyMetaData.description,
		]);
	} else {
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
