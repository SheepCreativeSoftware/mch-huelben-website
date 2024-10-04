import { buntstift } from 'buntstift';
import { getSmtpTransport } from './smtp-transport.js';

const baseEmailTemplate = `Hallo,

Dies ist eine Anfrage vom Kontaktformular von ${process.env.HOST}.

Nachricht von: {{name}}
--------------------------------
{{message}}
--------------------------------

-- 
Gesendet durch Mail-Service von ${process.env.HOST}.`;

const sendContactEmail = async ({ email, message, name, subject }: {
	email: string,
	message: string,
	name: string,
	subject: string,
}): Promise<void> => {
	const emailInPlainText = baseEmailTemplate.replace('{{message}}', message).replace('{{name}}', name);

	const info = await getSmtpTransport().sendMail({
		from: `"noreply" <${process.env.SMTP_USER}>`,
		replyTo: email,
		subject,
		text: emailInPlainText,
		// eslint-disable-next-line id-length -- This is given by the nodemailer API
		to: process.env.SMTP_CONTACT_EMAIL,
	});
	buntstift.success(`Sended contact mail - ${info.messageId}`);
};

export { sendContactEmail };
