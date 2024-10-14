import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';
import { useRouter } from 'vue-router';

const baseUrl = import.meta.env.SSR ? import.meta.env.VITE_BASE_URL : window.location.origin;
const TIME_OFFSET = 1000;

const useAccessStore = defineStore('access-store', {
	actions: {
		hasAccessRole(role: string): boolean {
			return this.role === role;
		},
		isTokenExpired(): boolean {
			return this.expiration !== 0 && new Date().getTime() > this.expiration * TIME_OFFSET;
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
			const url = new URL('/api/security/logout-user', baseUrl);
			const result = await fetch(url, {
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
				method: 'POST',
			});

			this.token = '';
			this.expiration = 0;
			this.role = '';
			this.user = '';
			localStorage.removeItem('token');

			if (!result.ok) throw new Error('Could not logout user');
			const router = useRouter();
			await router.push({ name: 'home' });
		},

		async refreshSession(): Promise<void> {
			const url = new URL('/api/security/refresh-token', baseUrl);
			const result = await fetch(url, {
				method: 'POST',
			});

			if (!result.ok) throw new Error('Could not refresh token');

			const body = await result.json();
			if (body.message === 'No refresh token found') throw new Error('Could not refresh token');

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
		},
	},
	getters: {
		isLoggedIn(): boolean {
			return this.token !== '';
		},

	},
	state: () => ({
		expiration: 0,
		role: '',
		token: '',
		user: '',
	}),
});

export { useAccessStore };
