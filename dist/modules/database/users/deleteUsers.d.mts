declare const removeUser: ({ email, name, role }: {
    email: string;
    name: string;
    role: string;
}) => Promise<void>;
export { removeUser };
