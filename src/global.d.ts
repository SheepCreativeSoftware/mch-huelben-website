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

		interface Request {
			user?: User | undefined;
			isLoggedIn: undefined | (() => boolean);
		}
	}

	interface Window {
		__pinia: string | undefined;
	}
}

