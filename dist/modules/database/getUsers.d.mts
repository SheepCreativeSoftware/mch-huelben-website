declare const getUsers: () => Promise<Express.User[]>;
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
export { getUsers, removeUser, setUser };
