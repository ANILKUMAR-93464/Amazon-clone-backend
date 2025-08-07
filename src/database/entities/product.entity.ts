import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from './category.entity';

@Entity('products')
export class Product {
  @ApiProperty({ example: 1, description: 'Auto-incremented product ID' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Wireless Headphones', description: 'Product name' })
  @Column({ length: 255, nullable: false })
  name: string;

  @ApiProperty({ example: 'High-quality wireless headphones', required: false })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ example: 99.99, description: 'Price in USD' })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @ApiProperty({ example: 79.99, required: false })
  @Column({name:'discounted_price', type: 'decimal', precision: 10, scale: 2, nullable: true })
  discountedPrice: number;


  @ApiProperty({ example: 1, description: 'Category ID' })
  @Column({ name: 'category_id', type: 'int', nullable: false })
  categoryId: number;

  @ApiProperty({ example: 'Sony', required: false })
  @Column({ length: 100, nullable: true })
  brand: string;

  @ApiProperty({ example: 50, default: 0 })
  @Column({name:'stock_quantity', type: 'int', default: 0 })
  stockQuantity: number;

  @ApiProperty({ type: () => User, description: 'Seller reference' })
  @ManyToOne(() => User, (user) => user.products)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @ApiProperty({ example: ['image1.jpg', 'image2.jpg'], required: false })
  @Column({ type: 'json', nullable: true })
  images: string[];

  @ApiProperty({ example: 4.5, default: 0.0 })
  @Column({name:'average_rating', type: 'decimal', precision: 2, scale: 1, default: 0.0 })
  averageRating: number;

  @ApiProperty({ example: 120, default: 0 })
  @Column({name:'review_count', type: 'int', default: 0 })
  reviewCount: number;

  @ApiProperty({ example: { color: 'Black', weight: '250g' }, required: false })
  @Column({ type: 'json', nullable: true })
  specifications: Record<string, any>;

  @ApiProperty({ example: '2023-01-01T00:00:00.000Z' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ example: '2023-01-02T00:00:00.000Z' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;


  @ApiProperty({ type: () => Category })
@ManyToOne(() => Category, (category) => category.products)
@JoinColumn({ name: 'category_id' })
category: Category; // Change categoryId to this



}