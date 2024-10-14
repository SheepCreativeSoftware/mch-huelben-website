import crypto from 'node:crypto';

const KEY_BYTES = 32;
const VECTOR_BYTES = 16;
const algorithm = 'aes-256-cbc';
const key = crypto.randomBytes(KEY_BYTES);

const encryptData = (data: string): string => {
	const initVector = crypto.randomBytes(VECTOR_BYTES);
	const cipher = crypto.createCipheriv(algorithm, key, initVector);

	let encryptedData = cipher.update(data, 'utf8');
	encryptedData = Buffer.concat([encryptedData, cipher.final()]);
	return Buffer.concat([initVector, encryptedData]).toString('hex');
};

const decryptData = (encryptedPayload: string) => {
	const encryptedPayloadBuffer = Buffer.from(encryptedPayload, 'hex');
	const initVector = encryptedPayloadBuffer.subarray(0, VECTOR_BYTES);
	const encryptedData = encryptedPayloadBuffer.subarray(VECTOR_BYTES, encryptedPayloadBuffer.length);

	const decipher = crypto.createDecipheriv(algorithm, key, initVector);

	// eslint-disable-next-line no-undefined -- no input encoding needed as input is buffer
	let decrypted = decipher.update(encryptedData, undefined, 'utf8');
	decrypted += decipher.final('utf8');

	return decrypted;
};

export { decryptData, encryptData };

