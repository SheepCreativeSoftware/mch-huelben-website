declare const getUsers: () => Promise<Express.User[]>;
declare const getUserById: (id: string) => Promise<Express.User | undefined>;
declare const getUserByEmail: (email: string) => Promise<Express.User | undefined>;
export { getUsers, getUserByEmail, getUserById };
