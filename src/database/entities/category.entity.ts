import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from './product.entity';

@Entity('categories')
export class Category {
  @ApiProperty({ example: 1, description: 'Auto-incremented ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Electronics', uniqueItems: true })
  @Column({ unique: true, length: 255 })
  name: string;

  @ApiProperty({ example: 'electronics', uniqueItems: true })
  @Column({ unique: true, length: 255 })
  slug: string;

  @ApiProperty({ example: 'Devices and gadgets', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
