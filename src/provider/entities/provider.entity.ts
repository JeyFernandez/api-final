import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Provider {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'numeric' })
  phone: number;

  @Column({ type: 'varchar' })
  direction: string;

  @Column({ type: 'varchar' })
  products: string[];
}
