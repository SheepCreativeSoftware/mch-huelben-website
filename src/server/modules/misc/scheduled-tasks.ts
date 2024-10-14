import { buntstift } from 'buntstift';
import { dataSource } from '../../database/datasource.js';
import { decryptData } from '../protection/encryption.js';
import { RefreshToken } from '../../database/entities/RefreshToken.js';
import { verifyJwtAccessToken } from '../protection/jwt-handling.js';

const scheduledTaskForRefreshTokenCleanup = async (): Promise<void> => {
	buntstift.info('Collecting old refresh tokens...');
	const refreshTokenRepository = dataSource.getRepository(RefreshToken);
	const refreshTokens = await refreshTokenRepository.find();

	const tokensToBeRemoved: RefreshToken[] = [];

	for (const refreshToken of refreshTokens) {
		try {
			// If one of them fail then the token is no longer valid
			const decryptedToken = decryptData(refreshToken.token);
			await verifyJwtAccessToken(decryptedToken);
		} catch {
			tokensToBeRemoved.push(refreshToken);
		}
	}

	if (tokensToBeRemoved.length) await refreshTokenRepository.remove(tokensToBeRemoved);
	buntstift.success(`Successfully removed ${tokensToBeRemoved.length} refresh tokens`);
};

export { scheduledTaskForRefreshTokenCleanup };
