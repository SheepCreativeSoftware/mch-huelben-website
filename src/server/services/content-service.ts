import { Content } from '../database/entities/Content.js';
import { dataSource } from '../database/datasource.js';
import { InternalServerException } from '../modules/misc/custom-errors.js';

const updateContent = async ({ identifier, content, title }: { identifier: string, content?: string, title?: string }): Promise<void> => {
	const repository = dataSource.getRepository(Content);
	const result = await repository.update(identifier, { content, title });

	if (!result.affected) throw new InternalServerException('Failed to update page content', { cause: result.raw });
};

export { updateContent };
