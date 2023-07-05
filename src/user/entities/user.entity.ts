import {
  // BeforeInsert,
  // BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { Exclude } from 'class-transformer';

import { Store } from 'src/stores/entities';
import { Recipe } from 'src/recipes/entities';
import { ValidRoles } from 'src/common/enums';
import { ValidStatus } from 'src/common/enums/valid.status';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', { unique: true })
  email: string;

  @Column('text', {
    select: false,
  })
  password: string;

  @Column('text')
  fullName: string;

  @Column('text')
  jobTitle: string;

  @Column('text', {
    nullable: true,
    default: ValidStatus.ACTIVE,
  })
  status: string;

  // @Exclude({ toPlainOnly: true })
  @Column('text', {
    array: true,
    nullable: true,
    default: [ValidRoles.USER],
  })
  roles: string[];

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;

  @DeleteDateColumn({
    name: 'deleted_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  deletedAt: Date;

  @OneToMany(() => Store, (store) => store.user)
  store: Store;

  @OneToMany(() => Recipe, (recipe) => recipe.user)
  recipe: Recipe;

  // @BeforeInsert()
  // checkFieldBeforeInsert() {
  //   this.email = this.email.toLocaleLowerCase().trim();
  //   this.fullName = this.fullName.toLocaleLowerCase().trim();
  // }

  // @BeforeUpdate()
  // checkFieldsBeforeUpdate() {
  //   this.checkFieldBeforeInsert();
  // }
}
