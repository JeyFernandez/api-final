import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fecha: string;

  @Column()
  clienteName: string;

  @Column({ type: 'varchar' })
  products: string[];

  @Column()
  cantidad: number;

  @Column()
  total: number;

  @Column()
  metodoPago: string;

  @Column()
  estado: string;

  @Column()
  empleado: string;
}
