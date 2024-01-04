import { buntstift } from 'buntstift';
import { defaults } from './modules/defaults.mjs';
import express from 'express';
import { expressLogger } from './modules/expressLogger.mjs';
const app = express();
if (process.env.NODE_ENV === 'development')
    app.use(express.static('dist/public'));
app.set('view-engine', 'ejs');
app.set('views', 'dist/views');
app.get('/', (req, res) => {
    res.render('index.ejs', { name: 'Marina' });
    expressLogger('success', req, res);
});
app.use(function (req, res) {
    res.status(defaults.status.notFound).send('Sorry cant find that!');
    expressLogger('warn', req, res);
});
app.use(function (err, req, res) {
    buntstift.error(`[${new Date().toUTCString()}] - IP: ${req.hostname} - Code: ${res.statusCode} - Requested: ${req.method} ${req.url}`);
    if (err.stack)
        buntstift.error(err.stack);
    res.status(defaults.status.serverError).send('Something broke!');
});
app.listen(process.env.SERVER_PORT || defaults).on('listening', () => {
    buntstift.success(`Server started and is listening on Port ${process.env.SERVER_PORT || defaults}`);
});
