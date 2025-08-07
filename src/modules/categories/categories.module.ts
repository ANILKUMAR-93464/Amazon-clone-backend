// import { forwardRef, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { CategoriesController } from './categories.controller';
// import { CategoriesService } from './categories.service';
// import { Category } from 'src/database/entities/category.entity';
// import { AuthModule } from '../auth/auth.module';
// import { ProductsModule } from '../products/products.module';


// @Module({
//   imports: [
//     TypeOrmModule.forFeature([Category]),
//     AuthModule,forwardRef(() => ProductsModule)// Add this line
//   ],
//   controllers: [CategoriesController],
//   providers: [CategoriesService],
//   exports: [TypeOrmModule.forFeature([Category]), CategoriesService], // Export for Product module
// })
// export class CategoriesModule {}

// src/modules/categories/categories.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { Category } from '../../database/entities/category.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    AuthModule,
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
  exports: [CategoriesService], // Export service if needed
})
export class CategoriesModule {}