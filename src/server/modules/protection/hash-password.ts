import bcrypt from 'bcrypt';

const saltRounds = 10;

const hashPassword = async (password: string): Promise<string> => {
	return await bcrypt.hash(password, saltRounds);
};

const comparePasswordWithHash = async (password: string, hash: string): Promise<boolean> => {
	return await bcrypt.compare(password, hash);
};

export { comparePasswordWithHash, hashPassword };
