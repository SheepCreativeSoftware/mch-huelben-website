import { buntstift } from 'buntstift';
import ejs from 'ejs';
import { getSmtpTransport } from './getSmtpTransport.mjs';
import path from 'path';
const sendMagicLinkEmail = async ({ email, url }) => {
    const basePath = path.join('dist', 'views');
    const emailInHtml = await ejs.renderFile(path.join(basePath, 'magicLinkEmail.ejs'), {
        email,
        host: process.env.HOST,
        href: url,
        title: `Sicherer Anmeldelink für ${process.env.HOST}`,
        url: process.env.URL,
    });
    const emailInPlainText = await ejs.renderFile(path.join(basePath, 'magicLinkEmailPlain.ejs'), {
        email,
        host: process.env.HOST,
        href: url,
        url: process.env.URL,
    });
    const info = await getSmtpTransport().sendMail({
        from: `"noreply" <${process.env.SMTP_USER}>`,
        html: emailInHtml,
        subject: `Sicherer Anmeldelink für ${process.env.HOST}`,
        text: emailInPlainText,
        // eslint-disable-next-line id-length
        to: email,
    });
    buntstift.success(`Sended MagicLink-Mail - ${info.messageId}`);
};
export { sendMagicLinkEmail };
