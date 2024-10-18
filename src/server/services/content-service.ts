import { InternalServerException, NotFoundException } from '../modules/misc/custom-errors.js';
import { Content } from '../database/entities/Content.js';
import { dataSource } from '../database/datasource.js';
import { removeImagesOnChange } from '../modules/misc/remove-images-on-content-change.js';

const updateContent = async ({ identifier, content, title }: { identifier: string, content?: string, title?: string }): Promise<void> => {
	const repository = dataSource.getRepository(Content);

	const contentEntity = await repository.findOne({ where: { identifier } });
	if (!contentEntity) throw new NotFoundException('Failed to find page content');
	if (content) await removeImagesOnChange({ newContent: content, previousContent: contentEntity.content });

	const result = await repository.update(identifier, { content, title });

	if (!result.affected) throw new InternalServerException('Failed to update page content', { cause: result.raw });
};

export { updateContent };
