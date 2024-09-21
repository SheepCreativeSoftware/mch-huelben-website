import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Events } from './entities/Events';
import { News } from './entities/News';

const MARIADB_PORT = 3306;

const dataSource = new DataSource({
	database: process.env.DATABASE_NAME,
	entities: [Events, News],
	host: process.env.DATABASE_HOST,
	logging: false,
	migrations: ['src/server/database/migration/*.ts'],
	password: process.env.DATABASE_PASSWORD,
	port: Number(process.env.DATABASE_PORT) || MARIADB_PORT,
	subscribers: [],
	synchronize: false,
	type: 'mariadb',
	username: process.env.DATABASE_USER,
});

export { dataSource };
