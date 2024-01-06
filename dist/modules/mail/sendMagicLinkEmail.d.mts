declare const sendMagicLinkEmail: ({ email, token }: {
    email: string;
    token: string;
}) => Promise<void>;
export { sendMagicLinkEmail };
