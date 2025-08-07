// import { forwardRef, Module } from '@nestjs/common';
// import { TypeOrmModule } from '@nestjs/typeorm';
// import { ProductsController } from './products.controller';
// import { ProductsService } from './products.service';
// import { Product } from 'src/database/entities/product.entity';
// import { Category } from 'src/database/entities/category.entity';
// import { User } from 'src/database/entities/user.entity';
// import { AuthModule } from '../auth/auth.module';
// import { CategoriesModule } from '../categories/categories.module';

// @Module({
//   imports: [TypeOrmModule.forFeature([Product, Category, User]), AuthModule, CategoriesModule,forwardRef(() => CategoriesModule)],
//   controllers: [ProductsController],
//   providers: [ProductsService],
//   exports: [TypeOrmModule.forFeature([Product])], 
// })
// export class ProductsModule {}


// src/modules/products/products.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Product } from '../../database/entities/product.entity';
import { Category } from '../../database/entities/category.entity';
import { User } from '../../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product, Category, User]),
    AuthModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService], // Export service if needed by other modules
})
export class ProductsModule {}