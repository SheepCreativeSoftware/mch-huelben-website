import crypto from 'node:crypto';

const createHash = (data: string): string => {
	return crypto.createHash('sha256').update(data, 'utf-8').digest('hex');
};

export { createHash };

