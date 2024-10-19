import { buntstift } from 'buntstift';
import { dataSource } from '../../database/datasource.js';
import { LessThan } from 'typeorm';
import { RefreshToken } from '../../database/entities/RefreshToken.js';

const scheduledTaskForRefreshTokenCleanup = async (): Promise<void> => {
	buntstift.info('Collecting old refresh tokens...');
	const refreshTokenRepository = dataSource.getRepository(RefreshToken);

	// eslint-disable-next-line new-cap -- This is not a constructor
	const result = await refreshTokenRepository.delete({ expiration: LessThan(new Date()) });
	buntstift.success(`Successfully removed ${result.affected ?? 0} refresh tokens`);
};

export { scheduledTaskForRefreshTokenCleanup };
