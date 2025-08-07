import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUrl, IsArray } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'Wireless Headphones' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'High-quality wireless headphones', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: 99.99 })
  @IsNotEmpty()
  @IsNumber()
  price: number;

  @ApiProperty({ example: 79.99, required: false }) 
  @IsOptional()
  @IsNumber()
  discountedPrice?: number;

  @ApiProperty({ example: 1 })
  @IsNotEmpty()
  @IsNumber()
  categoryId: number;

  @ApiProperty({ example: 'Sony', required: false })
  @IsOptional()
  @IsString()
  brand?: string;

  @ApiProperty({ example: ['https://image1.jpg', 'https://image2.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsUrl({}, { each: true })
  images?: string[];

  @ApiProperty({ example: { color: 'Black', weight: '250g' }, required: false })
  @IsOptional()
  specifications?: Record<string, any>;
}