import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { StatusCodes } from 'http-status-codes';

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;
const TIME_CONVERSION = 1000;
const TIME_OFFSET = 5000;
const MIN_OFFSET = 1000;

const getRandomOffset = () => {
	return Math.floor(Math.random() * (TIME_OFFSET - MIN_OFFSET)) + MIN_OFFSET;
};

const useAccessStore = defineStore('access-store', {
	actions: {
		hasAccessRole(role: string): boolean {
			return this.role === role;
		},

		// This function has a bit of an offset which is random to prevent a possible race condition on refreshing events
		isTokenExpired(): boolean {
			return this.expiration !== 0 && new Date().getTime() > (this.expiration * TIME_CONVERSION) - getRandomOffset();
		},
		isTokenExpiredWithoutOffset(): boolean {
			return this.expiration !== 0 && new Date().getTime() > (this.expiration * TIME_CONVERSION);
		},
		async loginUser(email: string, password: string): Promise<void> {
			const url = new URL('/api/security/login-user', baseUrl);
			const result = await fetch(url, {
				body: JSON.stringify({ email, password }),
				headers: {
					'Content-Type': 'application/json',
				},
				method: 'POST',
			});
			if (!result.ok) throw new Error('Could not login user');

			const body = await result.json();

			const decoded = jwtDecode(body.token);
			if (
				typeof decoded.exp !== 'number'
				|| typeof decoded.role !== 'string'
				|| typeof decoded.userId !== 'string'
			) throw new Error('Invalid token');

			this.token = body.token;
			this.expiration = decoded.exp;
			this.role = decoded.role;
			this.user = decoded.userId;
			this.storeTokenInLocalStore();
		},
		async logoutUser(): Promise<void> {
			this.expiration = 0;
			this.role = '';
			this.user = '';
			localStorage.removeItem('token');

			const url = new URL('/api/security/logout-user', baseUrl);
			const result = await fetch(url, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
				method: 'POST',
			});

			this.token = '';
			if (!result.ok) throw new Error('Could not logout user');
		},

		async refreshSession(): Promise<void> {
			/*
			 * This fuction is prevented from execution to prevent a race condition
			 * But in case the token is really expired it will be executed anyway
			 */
			if (!this.leadingInstance && !this.isTokenExpiredWithoutOffset()) return;

			const url = new URL('/api/security/refresh-token', baseUrl);
			const result = await fetch(url, {
				method: 'POST',
			});

			if (!result.ok || result.status === StatusCodes.NO_CONTENT.valueOf()) throw new Error('Could not refresh token');

			const body = await result.json();

			const decoded = jwtDecode(body.token);
			if (
				typeof decoded.exp !== 'number'
				|| typeof decoded.role !== 'string'
				|| typeof decoded.userId !== 'string'
			) throw new Error('Invalid token');

			this.token = body.token;
			this.expiration = decoded.exp;
			this.role = decoded.role;
			this.user = decoded.userId;
			this.storeTokenInLocalStore();
		},

		restoreTokenFromEvent(event: StorageEvent): void {
			if (event.key === 'token' && event.newValue) {
				this.leadingInstance = false;
				const token = event.newValue;
				const decoded = jwtDecode(token);
				if (
					typeof decoded.exp !== 'number'
					|| typeof decoded.role !== 'string'
					|| typeof decoded.userId !== 'string'
				) throw new Error('Invalid token');
				this.token = token;
				this.expiration = decoded.exp;
				this.role = decoded.role;
				this.user = decoded.userId;
			}
			if (event.key === 'token' && !event.newValue) {
				this.token = '';
				this.expiration = 0;
				this.role = '';
				this.user = '';
			}
		},

		restoreTokenFromLocalStore(): void {
			const token = localStorage.getItem('token');
			if (token) {
				const decoded = jwtDecode(token);
				if (
					typeof decoded.exp !== 'number'
					|| typeof decoded.role !== 'string'
					|| typeof decoded.userId !== 'string'
				) throw new Error('Invalid token');
				this.token = token;
				this.expiration = decoded.exp;
				this.role = decoded.role;
				this.user = decoded.userId;
			}
		},

		storeTokenInLocalStore(): void {
			localStorage.setItem('token', this.token);
			this.leadingInstance = true;
		},
	},
	getters: {
		isLoggedIn(): boolean {
			return this.token !== '';
		},

	},
	state: () => ({
		expiration: 0,
		leadingInstance: true,
		role: '',
		token: '',
		user: '',
	}),
});

export { useAccessStore };
