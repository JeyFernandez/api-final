import { Category } from 'src/categories/entities/category.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text' })
  detalle: string;

  @Column({ type: 'numeric' })
  price: number;

  @Column({ type: 'numeric' })
  stock: number;

  @JoinTable()
  @ManyToMany(() => Category, (category) => category.products, { eager: true })
  categories: Category[];
}
