import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, Put, UnauthorizedException } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOkResponse, ApiNotFoundResponse, ApiOperation } from '@nestjs/swagger';
// import { UserRole } from '../users/entities/user.entity';
import { ProductQueryDto } from './dto/product-query.dto';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { RolesGuard } from 'src/guards/roles.guard';
import { AuthGuard } from 'src/guards/auth.guard';
import { Roles } from 'src/decorators/roles.decorator';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @ApiOperation({summary:"Search Products and Get a list of products and "})
  @ApiOkResponse({ description: 'List of products with pagination' })
  findAll(@Query() query: ProductQueryDto) {
    return this.productsService.findAll(query);
  }

  @Get(':id')
  @ApiOperation({summary:"Get product with id"})
  @ApiOkResponse({ description: 'Product details' })
  @ApiNotFoundResponse({ description: 'Product not found' })
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Post('add-product')
  @ApiOperation({summary:"Add a product by seller only"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('seller')
  @ApiBearerAuth()
  create(@Body() dto: CreateProductDto, @Req() req) {
     if (!req.user?.id) {
    throw new UnauthorizedException('Invalid user identification');
  }
    return this.productsService.create(dto, req.user.id);
  }

  @Put(':id')
  @ApiOperation({summary:"Update product by seller"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('seller')
  @ApiBearerAuth()
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(+id, dto);
  }

  @Delete(':id')
  @ApiOperation({summary:"Delete product by seller or admin"})
  @UseGuards(AuthGuard, RolesGuard)
  @Roles('seller', 'admin')
  @ApiBearerAuth()
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}