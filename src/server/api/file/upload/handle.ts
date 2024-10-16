import { BadRequestException } from '../../../modules/misc/custom-errors.js';
import type { Handler } from 'express';
import { StatusCodes } from 'http-status-codes';

const getFileUploadHandle = (): Handler => {
	return (req, res, next) => {
		try {
			if (!req.files?.length) throw new BadRequestException('No files were uploaded');
			// If (file.size === 0) throw new BadRequestException('File is empty');

			res.status(StatusCodes.CREATED).send({ message: 'File uploaded!' });
		} catch (error) {
			next(error);
		}
	};
};

export { getFileUploadHandle };
