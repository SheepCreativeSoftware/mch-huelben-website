import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
/* eslint-enable new-cap -- This is not a constructor */

export { User };
