import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from 'src/user/entities/user.entity';

@Entity({ name: 'stores' })
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  title: string;

  @Column('text', { nullable: true })
  address: string;

  @Column('bool', { nullable: true, default: true })
  status: boolean;

  @ManyToOne(() => User, (user) => user.store, { eager: true })
  user: User;
}
