import { buntstift } from 'buntstift';
import { getSmtpTransport } from './smtp-transport.js';

const subject = 'Passwort zurücksetzen';

const baseEmailTemplate = `Hallo,

Es gab eine Anfrage, dein Passwort zu ändern.
Klicke bitte auf den Link unten, um dein Passwort zurückzusetzen.
Dieser Link wird in 15 Minuten ablaufen.

Password zurücksetzen:
${process.env.URL}/password-reset?token={{token}}

Wenn du diese Anfrage nicht gemacht hast und vermutest, dass dein Konto gefährdet ist, kontaktiere uns bitte unter ${process.env.SMTP_ADMIN_EMAIL}

-- 
Gesendet durch Mail-Service von ${process.env.HOST}.`;

const baseEmailHTMLTemplate = `<!DOCTYPE html>
	<head>
		<meta charset="utf-8">
		<title>${subject}</title>
	</head>
	<body>
		<p>
			Hallo,
			<br><br>
			Es gab eine Anfrage, dein Passwort zu ändern.<br>
			Klicke bitte auf den Link unten, um dein Passwort zurückzusetzen.<br>
			Dieser Link wird in 15 Minuten ablaufen.<br>
			<br>
			<strong><a href="${process.env.URL}/password-reset?token={{token}}">Passwort zurücksetzen</a></strong><br>
			<br>
			Wenn du diese Anfrage nicht gemacht hast und vermutest, dass dein Konto gefährdet ist,
			kontaktiere uns bitte unter <a href="mailto:${process.env.SMTP_ADMIN_EMAIL}">${process.env.SMTP_ADMIN_EMAIL}</a><br>
			<br>
			<small>
				--<br>
				Gesendet durch Mail-Service von ${process.env.HOST}.
			</small>
		</p>
	</body>
</html>`;

const sendPasswordResetEmail = async ({ email, token }: {
	email: string,
	token: string,
}): Promise<void> => {
	const emailInPlainText = baseEmailTemplate.replace('{{token}}', token);
	const emailInPlainHTML = baseEmailHTMLTemplate.replace('{{token}}', token);

	const info = await getSmtpTransport().sendMail({
		from: `"noreply" <${process.env.SMTP_USER}>`,
		html: emailInPlainHTML,
		replyTo: process.env.SMTP_ADMIN_EMAIL,
		subject,
		text: emailInPlainText,
		// eslint-disable-next-line id-length -- This is given by the nodemailer API
		to: email,
	});
	buntstift.success(`Sended passwort reset mail - ${info.messageId}`);
};

export { sendPasswordResetEmail };
