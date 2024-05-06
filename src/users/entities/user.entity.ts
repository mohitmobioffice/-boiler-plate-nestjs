import { AbstractEntity } from 'src/database/abstract.entiry';
import { Column } from 'typeorm';

export class User extends AbstractEntity<User> {
  @Column()
  username: string;
}
