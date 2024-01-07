/* eslint-disable sort-keys */
import { buntstift } from 'buntstift';
import { getUsers } from '../database/getUsers.mjs';
import MagicLoginStrategy from 'passport-magic-login';
import { sendMagicLinkEmail } from '../mail/sendMagicLinkEmail.mjs';

const initialize = (callbackUrl: string) => {
// IMPORTANT: ALL OPTIONS ARE REQUIRED!
	if(!process.env.JWT_SECRET) throw new Error('Missing JWT Secret');
	// eslint-disable-next-line new-cap
	const magicLogin = new MagicLoginStrategy.default({

		// Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
		secret: process.env.JWT_SECRET,

		// The authentication callback URL
		callbackUrl,

		/*
		 * Called with th e generated magic link so you can send it to the user
		 * "destination" is what you POST-ed from the client
		 * "href" is your confirmUrl with the confirmation token,
		 * for example "/auth/magiclogin/confirm?token=<longtoken>"
		 */
		sendMagicLink: async (destination, href) => {
			const users = await getUsers();
			const user = users.find((thisUser) => thisUser.email === destination);
			if(typeof user === 'undefined') {
				buntstift.error(`Unknown user tried to login! email: ${destination}`);
			} else {
				try {
					await sendMagicLinkEmail({
						email: destination,
						url: `${process.env.URL}${href}`,
					});
				} catch (error) {
					if(error instanceof Error) buntstift.error(error.message);
				}
			}
		},

		/*
		 * Once the user clicks on the magic link and verifies their login attempt,
		 * you have to match their email to a user record in the database.
		 * If it doesn't exist yet they are trying to sign up so you have to create a new one.
		 * "payload" contains { "destination": "email" }
		 * In standard passport fashion, call callback with the error as the first argument (if there was one)
		 * and the user data as the second argument!
		 */
		verify: async (payload, callback) => {
		// Get or create a user with the provided email from the database
			const users = await getUsers();
			const user = users.find((thisUser) => thisUser.email === payload.destination);
			if(typeof user === 'undefined') callback(new Error(`Unkown User tried to login: ${JSON.stringify(payload)}`));
			callback(null, user);
		},


		// Optional: options passed to the jwt.sign call (https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)
		jwtOptions: {
			expiresIn: '24h',
		},
	});

	return magicLogin;
};

export { initialize };
