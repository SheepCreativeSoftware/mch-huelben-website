import nodemailer from 'nodemailer';
const getSmtpTransport = () => {
    if (typeof process.env.SMTP_USER === 'undefined')
        throw new Error('Missing SMTP User');
    return nodemailer.createTransport({
        auth: {
            pass: process.env.SMTP_PASSWORD,
            user: process.env.SMTP_USER,
        },
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: true,
    });
};
export { getSmtpTransport };
