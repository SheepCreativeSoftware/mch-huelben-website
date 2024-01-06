

// Todo: get users from DB
const users = [
	{
		email: process.env.SMTP_ADMIN_EMAIL as string,
		// eslint-disable-next-line id-length
		id: 1,
		name: 'Admin',
		role: 'Admin',
	},
];

const getUsers = () => {
	return users;
};

export { getUsers };
