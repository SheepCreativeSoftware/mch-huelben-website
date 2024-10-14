import { Column, Entity, OneToMany, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { RefreshToken } from './RefreshToken.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('users')
class User {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
	})
	identifier: string;

	@Column({
		name: 'email',
		type: 'tinytext',
		unique: true,
	})
	email: string;

	@Column({
		enum: ['User', 'Admin'],
		name: 'role',
		type: 'enum',
	})
	role: 'User' | 'Admin';

	@Column({
		name: 'password',
		type: 'tinytext',
	})
	password: string;

	@Column({
		default: true,
		name: 'active',
		type: 'boolean',
	})
	active: boolean;

	@OneToMany(() => RefreshToken, (refreshToken) => refreshToken.user)
	refreshToken: Relation<RefreshToken[]>;
}
/* eslint-enable new-cap -- This is not a constructor */

export { User };
