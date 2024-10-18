import { BadRequestException, InternalServerException } from '../../../modules/misc/custom-errors.js';
import { unlink, writeFile } from 'node:fs/promises';
import { buntstift } from 'buntstift';
import { extension } from 'mime-types';
import type fileUpload from 'express-fileupload';
import type { Handler } from 'express';
import path from 'node:path';
import { StatusCodes } from 'http-status-codes';

const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/bmp',
];

const removeFilesOnFailure = async (filePaths: string[]): Promise<void> => {
	for (const filePath of filePaths) {
		try {
			await unlink(path.resolve(process.cwd(), 'public', filePath));
		} catch (error) {
			if (error instanceof Error) {
				buntstift.error(`Failed to remove file: ${filePath} - ${error.message}`);
				continue;
			}
			buntstift.error(`Failed to remove file: ${filePath} - ${JSON.stringify(error)}`);
		}
	}
};

const handleFileUpload = async (file: fileUpload.UploadedFile): Promise<string> => {
	if (file.size === 0) throw new BadRequestException('Unexpected empty file provided');
	if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) throw new BadRequestException(`Invalid file mime type: ${file.mimetype}`);

	const fileExtension = extension(file.mimetype);
	if (fileExtension === false) throw new InternalServerException('Invalid file type');
	const filePath = path.join('fileupload', `${crypto.randomUUID()}.${fileExtension}`);

	// Flush makes sure the file is fully written before continuing
	await writeFile(path.resolve(process.cwd(), 'public', filePath), file.data, { flush: true });

	return filePath;
};

const getFileUploadHandle = (): Handler => {
	return async (req, res, next) => {
		const filePaths: string[] = [];
		try {
			if (!req.files?.file) throw new BadRequestException('No files were uploaded');
			if (Array.isArray(req.files.file)) for (const file of req.files.file) filePaths.push(await handleFileUpload(file));
			else filePaths.push(await handleFileUpload(req.files.file));

			res.status(StatusCodes.CREATED).send({ filePaths, message: 'File uploaded!' });
		} catch (error) {
			await removeFilesOnFailure(filePaths);
			next(error);
		}
	};
};

export { getFileUploadHandle };
