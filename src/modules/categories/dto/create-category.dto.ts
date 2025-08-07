import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Electronics' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'electronics' })
  @IsNotEmpty()
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Devices and gadgets', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  // @ApiProperty({ example: 'icon-electronics.png', required: false })
  // @IsOptional()
  // @IsString()
  // icon?: string;
}