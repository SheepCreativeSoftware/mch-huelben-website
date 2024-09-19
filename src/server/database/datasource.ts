import 'reflect-metadata';
import { DataSource } from 'typeorm';

const MARIADB_PORT = 3306;

const dataSource = new DataSource({
	database: process.env.DB_DATABASE,
	entities: [],
	host: process.env.DB_HOST,
	logging: false,
	migrations: [],
	password: process.env.DB_PASSWORD,
	port: Number(process.env.DB_PORT) || MARIADB_PORT,
	subscribers: [],
	synchronize: false,
	type: 'mariadb',
	username: process.env.DB_USER,
});

export { dataSource };
