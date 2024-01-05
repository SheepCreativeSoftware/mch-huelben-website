import { connectDb, getConnection } from './modules/database/connectDatabase.mjs';
import { buntstift } from 'buntstift';
import { defaults } from './modules/defaults.mjs';
import express from 'express';
import { expressLogger } from './modules/expressLogger.mjs';
const app = express();
// Set path for production or development - Static is not needed in production
let defaultPath = './';
if (process.env.NODE_ENV === 'development') {
    defaultPath = './dist/';
    app.use(express.static(defaultPath + 'public'));
    buntstift.configure(buntstift.getConfiguration().withVerboseMode(true));
}
// Setup ejs view engine
app.set('view engine', 'ejs');
app.set('views', defaultPath + 'views');
// Setup basic middlewares
// Setup public routes
app.get('/', (req, res) => {
    res.render('index', { name: 'Marina' });
    expressLogger('success', req, res);
});
// Setup restricted routes
// Setup restricted csrf protected routes
// Handle Error routes
app.use(function (req, res) {
    res.status(defaults.status.notFound).send('Sorry cant find that!');
    expressLogger('warn', req, res);
});
app.use(function (err, req, res) {
    expressLogger('error', req, res);
    if (err.stack)
        buntstift.error(err.stack);
    res.status(defaults.status.serverError).send('Something broke!');
});
app.listen(process.env.SERVER_PORT || defaults).on('listening', () => {
    buntstift.success(`Server started and is listening on Port ${process.env.SERVER_PORT || defaults}`);
});
const asyncFunction = async function () {
    await connectDb({
        host: process.env.DATABASE_HOST,
        port: Number(process.env.DATABASE_PORT),
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
    });
    let conn = await getConnection();
    console.log("connected ! connection id is " + conn.threadId);
    try {
        const res = await conn.query('select 1', [2]);
        const res2 = await conn.query('CREATE TABLE IF NOT EXISTS test (id INT NULL)');
        console.log(res, res2); // [{ "1": 1 }]
        return res;
    }
    finally {
        await conn.end();
        console.log(conn.isValid());
        setInterval(async () => {
            conn = await getConnection();
            console.log(conn.isValid());
            console.log("connected ! connection id is " + conn.threadId);
        }, 15_000);
    }
};
asyncFunction();
