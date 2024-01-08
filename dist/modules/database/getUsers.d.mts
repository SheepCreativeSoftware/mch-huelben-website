declare const getUsers: () => Promise<Express.User[]>;
declare const getUserById: (id: string) => Promise<Express.User | undefined>;
declare const getUserByEmail: (email: string) => Promise<Express.User | undefined>;
declare const setUser: ({ email, name, role }: {
    email: string;
    name: string;
    role: string;
}) => Promise<void>;
declare const removeUser: ({ email, name, role }: {
    email: string;
    name: string;
    role: string;
}) => Promise<void>;
export { getUsers, getUserByEmail, getUserById, removeUser, setUser };
