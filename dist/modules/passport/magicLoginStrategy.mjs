/* eslint-disable sort-keys */
import { buntstift } from 'buntstift';
import { getUserByEmail } from '../database/users/getUsers.mjs';
import MagicLoginStrategy from 'passport-magic-login';
import { randomBytes } from 'crypto';
import { sendMagicLinkEmail } from '../mail/sendMagicLinkEmail.mjs';
const size = 128;
let expiresIn = '24h';
let randomSecretKey = process.env.JWT_SECRET || randomBytes(size).toString('hex');
if (process.env.NODE_ENV === 'production') {
    randomSecretKey = String(process.env.JWT_SECRET) + randomBytes(size).toString('hex');
    expiresIn = '15m';
}
const tokenSessionStore = [];
const removeMillis = 1000;
const oneElement = 1;
const clearTokenSessionStore = () => {
    buntstift.verbose(`tokenSessionStore.length is ${tokenSessionStore.length}`);
    const currentDate = Date.now() / removeMillis;
    tokenSessionStore.forEach((value, index, array) => {
        if (value.exp <= currentDate)
            array.splice(index, oneElement);
    });
};
const initialize = (callbackUrl) => {
    // IMPORTANT: ALL OPTIONS ARE REQUIRED!
    if (!process.env.JWT_SECRET)
        throw new Error('Missing JWT Secret');
    // eslint-disable-next-line new-cap
    const magicLogin = new MagicLoginStrategy.default({
        // Used to encrypt the authentication token. Needs to be long, unique and (duh) secret.
        secret: randomSecretKey,
        // The authentication callback URL
        callbackUrl,
        /*
         * Called with th e generated magic link so you can send it to the user
         * "destination" is what you POST-ed from the client
         * "href" is your confirmUrl with the confirmation token,
         * for example "/auth/magiclogin/confirm?token=<longtoken>"
         */
        sendMagicLink: async (destination, href) => {
            const user = await getUserByEmail(destination);
            if (typeof user === 'undefined') {
                buntstift.error(`Unknown user tried to login! email: ${destination}`);
            }
            else {
                try {
                    await sendMagicLinkEmail({
                        email: destination,
                        url: `${process.env.URL}${href}`,
                    });
                }
                catch (error) {
                    if (error instanceof Error)
                        buntstift.error(error.message);
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
            // Store the tokens payload and fail if token has been reused
            clearTokenSessionStore();
            if (tokenSessionStore.some((token) => token.code === payload.code)) {
                // ...
                return callback(new Error(`Token already used: ${payload.code}`));
            }
            tokenSessionStore.push(payload);
            // Get a user with the provided email from the database
            const user = await getUserByEmail(payload.destination);
            buntstift.verbose(`Verify user: ${user?.id}`);
            if (typeof user === 'undefined')
                return callback(new Error(`Unkown User tried to login: ${JSON.stringify(payload)}`));
            return callback(null, user);
        },
        // Optional: options passed to the jwt.sign call (https://github.com/auth0/node-jsonwebtoken#jwtsignpayload-secretorprivatekey-options-callback)
        jwtOptions: {
            expiresIn,
        },
    });
    return magicLogin;
};
export { initialize };
