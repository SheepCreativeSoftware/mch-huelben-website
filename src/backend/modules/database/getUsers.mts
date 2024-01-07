

// Todo: get users from DB
const users: Express.User[] = [
	{
		email: process.env.SMTP_ADMIN_EMAIL as string,
		// eslint-disable-next-line id-length
		id: 1,
		name: 'Admin',
		role: 'admin',
	},
];

const getUsers = () => {
	return users;
};

export { getUsers };
