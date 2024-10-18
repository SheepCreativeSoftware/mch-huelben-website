import { BadRequestException } from '../../../modules/misc/custom-errors.js';
import type fileUpload from 'express-fileupload';
import type { Handler } from 'express';
import path from 'node:path';
import { StatusCodes } from 'http-status-codes';
import { writeFile } from 'node:fs/promises';

const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/bmp',
];

const handleFileUpload = async (file: fileUpload.UploadedFile): Promise<string> => {
	if (file.size === 0) throw new BadRequestException('File is empty');
	if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) throw new BadRequestException('Invalid file type');

	const fileExtension = file.mimetype.replace('image/', '');
	const filePath = path.join('fileupload', `${crypto.randomUUID()}.${fileExtension}`);

	await writeFile(path.resolve(process.cwd(), 'public', filePath), file.data);

	return filePath;
};

const getFileUploadHandle = (): Handler => {
	return async (req, res, next) => {
		try {
			if (!req.files?.file) throw new BadRequestException('No files were uploaded');
			const filePaths: string[] = [];
			if (Array.isArray(req.files.file)) for (const file of req.files.file) filePaths.push(await handleFileUpload(file));
			else filePaths.push(await handleFileUpload(req.files.file));

			res.status(StatusCodes.CREATED).send({ filePaths, message: 'File uploaded!' });
		} catch (error) {
			next(error);
		}
	};
};

export { getFileUploadHandle };
