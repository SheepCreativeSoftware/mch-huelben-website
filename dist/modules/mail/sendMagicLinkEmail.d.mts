declare const sendMagicLinkEmail: ({ email, url }: {
    email: string;
    url: string;
}) => Promise<void>;
export { sendMagicLinkEmail };
