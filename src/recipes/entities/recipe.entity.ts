import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { UserEntity } from 'src/user/entities/user.entity';

@Entity({ name: 'recipes' })
export class Recipe {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text')
  title: string;

  @Column('text')
  mainTitle: string;

  @Column('text')
  portion_size: string;

  @Column('text')
  preparation_minutes: string;

  @Column('text')
  difficulty: string;

  @Column('text', { nullable: true })
  score: string;

  @Column('text')
  category: string;

  @Column('text', { nullable: true })
  image: string;

  @Column('bool', { default: false })
  favorite: boolean;

  @Column('bool', { default: true })
  status: boolean;

  @ManyToOne(() => UserEntity, (user) => user.recipe, { eager: true })
  user: UserEntity;
}
