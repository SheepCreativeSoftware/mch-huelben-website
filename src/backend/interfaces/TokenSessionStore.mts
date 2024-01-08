interface TokenSessionStore {
	destination: string,
	code: string,
	iat: number,
	exp: number
}

export { TokenSessionStore };
