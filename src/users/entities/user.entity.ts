import { BaseCollection } from 'src/common/shared/base.entity';
import { Column, Entity, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User extends BaseCollection {
  @Column({ name: 'email', length: 255 })
  email: string;

  @Column({ name: 'name', length: 120 })
  name: string;

  @Column({ name: 'password', length: 255 })
  password: string;
  
}