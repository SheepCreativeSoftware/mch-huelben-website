import { UUID } from 'crypto';

interface MetaDataDB {
	title: string,
	keywords: string,
	description: string,
}

interface FullMeatDataDB extends MetaDataDB {
	id: UUID,
}

export { FullMeatDataDB, MetaDataDB };
