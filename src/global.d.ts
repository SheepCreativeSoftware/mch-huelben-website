import type { UUID } from 'node:crypto';

declare global {
	namespace Express {
		interface CreatorUser {
			role: 'Creator';
			userId: UUID;
		}

		interface AnswererUser {
			role: 'Answerer';
			surveyId: UUID;
			endDate: string;
			answererId: UUID;
		}

		type User = CreatorUser | AnswererUser;

		// eslint-disable-next-line no-shadow
		interface Request {
			user?: User | undefined;
			isLoggedIn: undefined | (() => boolean);
		}
	}
}
