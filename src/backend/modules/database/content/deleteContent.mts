import { getConnection } from '../connectDatabase.mjs';
import { UUID } from 'crypto';

// eslint-disable-next-line id-length
const removeContent = async (page: string, id: UUID) => {
	const conn = await getConnection();
	await conn.query('DELETE FROM content WHERE id=? AND page=?', [
		id,
		page,
	]);
};

export { removeContent };
