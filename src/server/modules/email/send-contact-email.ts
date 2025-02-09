import { buntstift } from 'buntstift';
import { getSmtpTransport } from './smtp-transport.js';

const baseEmailTemplate = `Hallo,

Dies ist eine Anfrage vom Kontaktformular.

Nachricht von: {{name}} <{{email}}>
--------------------------------
{{message}}
--------------------------------

-- 
Gesendet durch Mail-Service von ${process.env.HOST}.`;

const baseEmailHTMLTemplate = `<!DOCTYPE html>
	<head>
		<meta charset="utf-8">
		<title>{{subject}}</title>
	</head>
	<body>
		<p>
			Hallo,
			<br><br>
			Dies ist eine Anfrage vom Kontaktformular.
			<br><br>
			<strong>Nachricht von:</strong> {{name}} &lt;{{email}}&gt;
			<br>
			<hr>
			{{message}}
			<hr>
			<br>
			<small>
				Gesendet durch Mail-Service von ${process.env.HOST}.
			</small>
		</p>
	</body>
</html>`;

const sendContactEmail = async ({ email, message, name, subject }: {
	email: string,
	message: string,
	name: string,
	subject: string,
}): Promise<void> => {
	const emailInPlainText = baseEmailTemplate.replace('{{message}}', message).replace('{{name}}', name).replace('{{email}}', email);
	const emailInPlainHTML = baseEmailHTMLTemplate.replace('{{message}}', message).replace('{{name}}', name).replace('{{email}}', email);

	const info = await getSmtpTransport().sendMail({
		from: `"noreply" <${process.env.SMTP_USER}>`,
		html: emailInPlainHTML,
		replyTo: email,
		subject,
		text: emailInPlainText,
		// eslint-disable-next-line id-length -- This is given by the nodemailer API
		to: process.env.SMTP_CONTACT_EMAIL,
	});
	buntstift.success(`Sended contact mail - ${info.messageId}`);
};

export { sendContactEmail };
