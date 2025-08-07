import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, Between } from 'typeorm';

import { Product } from 'src/database/entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { User } from 'src/database/entities/user.entity';
import { Category } from 'src/database/entities/category.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepo: Repository<Product>,

    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  async create(dto: CreateProductDto, sellerId: number) {

    const category = await this.categoryRepo.findOneBy({id: dto.categoryId})
    if(!category){
      throw new NotFoundException('Category Not Found..')
    }
     // Verify seller exists
  const seller = await this.productRepo.manager.findOne(User, {
    where: { id: sellerId },
    select: ['id'] // Only fetch what we need
  });

  if (!seller) {
    throw new NotFoundException(`Seller with ID ${sellerId} not found`);
  }
    
    
    const product = this.productRepo.create({
      ...dto,
      seller: { id: sellerId },
      category: { id: dto.categoryId },
    });
    return this.productRepo.save(product);
  }

 async findAll(query: ProductQueryDto) {
  const { q, minPrice, maxPrice, categoryId, brand, page = 1, limit = 4 } = query;
  const where: any = {};

  if (q) where.name = Like(`%${q}%`);
  if (minPrice !== undefined || maxPrice !== undefined) {
    where.price = Between(minPrice || 0, maxPrice || Number.MAX_SAFE_INTEGER);
  }
  if (categoryId) where.category = { id: categoryId };
  if (brand) where.brand = brand;

  const [products, total] = await this.productRepo.findAndCount({
    where,
    relations: ['category', 'seller'],
    skip: (page - 1) * limit,
    take: limit,
  });

  return {
    data: products,
    meta: {
      total,
      page,
      last_page: Math.ceil(total / limit),
    },
  };
}

  async findOne(id: number) {
    const product = await this.productRepo.findOne({ 
      where: { id },
      relations: ['category', 'seller'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    return this.productRepo.save({ ...product, ...dto });
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    return this.productRepo.remove(product);
  }
}