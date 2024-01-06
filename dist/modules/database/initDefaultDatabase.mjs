import { connectDb, getConnection } from './connectDatabase.mjs';
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
