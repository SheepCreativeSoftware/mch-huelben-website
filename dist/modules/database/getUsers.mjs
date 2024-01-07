// Todo: get users from DB
const users = [
    {
        email: process.env.SMTP_ADMIN_EMAIL,
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
