import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';

import { Store } from 'src/stores/entities';
import { Recipe } from 'src/recipes/entities';
import { ValidRoles } from 'src/common/enums';
import { ValidStatus } from 'src/common/enums/valid.status';

@Entity('user')
export class User {
  @Exclude({ toPlainOnly: true })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Exclude({ toPlainOnly: true })
  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Exclude({ toPlainOnly: true })
  @Column('text')
  fullName: string;

  @Column('text', {
    nullable: true,
    default: ValidStatus.ACTIVE,
  })
  status: string;

  @Exclude({ toPlainOnly: true })
  @Column('text', {
    array: true,
    nullable: true,
    default: [ValidRoles.USER],
  })
  roles: string[];

  @OneToMany(() => Store, (store) => store.user)
  store: Store;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipe: Recipe;

  @BeforeInsert()
  checkFieldBeforeInsert() {
    this.email = this.email.toLocaleLowerCase().trim();
    this.fullName = this.fullName.toLocaleLowerCase().trim();
  }

  @BeforeUpdate()
  checkFieldsBeforeUpdate() {
    this.checkFieldBeforeInsert();
  }
}
