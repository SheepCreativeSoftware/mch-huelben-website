import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, type Relation } from 'typeorm';
import { User } from './User.js';

/* eslint-disable new-cap -- This is not a constructor */
@Entity('refresh_token')
class RefreshToken {
	@PrimaryGeneratedColumn('uuid', {
		name: 'id',
	})
	identifier: string;

	@Column({
		name: 'token',
		type: 'text',
	})
	token: string;

	@Column({
		name: 'expiration',
		type: 'timestamp',
	})
	expiration: Date;

	@ManyToOne(() => User, (user) => user.refreshToken)
	@JoinColumn({
		foreignKeyConstraintName: 'fk_refresh_token_user',
		name: 'user_id',
		referencedColumnName: 'identifier',
	})
	user: Relation<User>;
}
/* eslint-enable new-cap -- This is not a constructor */

export { RefreshToken };
