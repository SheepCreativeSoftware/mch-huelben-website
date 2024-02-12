import { ContentType } from '../../../types/ContentType.mjs';
import { getConnection } from '../connectDatabase.mjs';


// eslint-disable-next-line id-length
const addContent = async (page: string, type: ContentType, content: string='') => {
	const conn = await getConnection();
	await conn.query('INSERT INTO content (page, type, content) VALUES (?, ?, ?)', [
		page,
		type,
		content,
	]);
};

export { addContent };
