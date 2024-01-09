import mariadb from 'mariadb';
/** Establish a connection to DB or returns current connection */
declare const connectDb: (connectionUri: mariadb.ConnectionConfig) => mariadb.Connection | Promise<mariadb.Connection>;
/** Returns the current active connection */
declare const getConnection: () => mariadb.Connection | Promise<mariadb.Connection>;
export { connectDb, getConnection };
