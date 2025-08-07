// src/database/seeds/categories.seed.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';


@Injectable()
export class CategoriesSeedService {
  constructor(
    @InjectRepository(Category)
    private repository: Repository<Category>,
  ) {}

  async run() {
    const categories = [
      { name: 'Electronics', slug: 'electronics' },
      { name: 'Clothing', slug: 'clothing' },
      { name: 'Books', slug: 'books' },
    ];

    await this.repository.save(
      categories.map(category => this.repository.create(category))
    );
  }
}