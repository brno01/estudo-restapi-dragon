import { BaseCollection } from 'src/common/shared/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends BaseCollection {
  @Column({ name: 'email', length: 255 })
  email: string;

  @Column({ name: 'name', length: 120 })
  name: string;

  @Column({ name: 'password', length: 255 })
  password: string;
}