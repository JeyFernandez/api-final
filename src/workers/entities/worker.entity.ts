import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Worker {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  phone: number;

  @Column()
  direction: string;

  @Column()
  dni: string;

  @Column()
  position: string;
}
