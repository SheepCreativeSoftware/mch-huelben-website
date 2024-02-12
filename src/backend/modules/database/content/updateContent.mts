import { ContentType } from '../../../types/ContentType.mjs';
import { getConnection } from '../connectDatabase.mjs';
import { UUID } from 'crypto';


// eslint-disable-next-line id-length
const setContent = async (page: string, type: ContentType, content: string, id: UUID) => {
	const conn = await getConnection();
	await conn.query('UPDATE content SET content = ? WHERE page=? AND id=?', [
		content,
		page,
		id,
	]);
};

export { setContent };
