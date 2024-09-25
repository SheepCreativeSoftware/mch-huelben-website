import 'reflect-metadata';
import { Content } from './entities/Content.js';
import { DataSource } from 'typeorm';
import { Events } from './entities/Events.js';
import { Meta } from './entities/Meta.js';
import { News } from './entities/News.js';
import { Pages } from './entities/Pages.js';
import path from 'node:path';

const MARIADB_PORT = 3306;

const dataSource = new DataSource({
	database: process.env.DATABASE_NAME,
	entities: [
		Content, Events, Meta, News, Pages,
	],
	host: process.env.DATABASE_HOST,
	logging: false,
	migrations: [path.resolve(process.cwd(), './src/server/database/migration/**/*')],
	password: process.env.DATABASE_PASSWORD,
	port: Number(process.env.DATABASE_PORT) || MARIADB_PORT,
	subscribers: [],
	synchronize: false,
	type: 'mariadb',
	username: process.env.DATABASE_USER,
});

export { dataSource };
