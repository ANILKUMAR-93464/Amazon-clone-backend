
// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';

// export class UpdateUserDto extends PartialType(CreateUserDto) {
//   // Inherits all fields from CreateUserDto but makes them optional
//   // Add additional update-specific fields if needed
// } 

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    example: 'new.user@example.com',
    description: 'The updated email address of the user',
    required: false
  })
  email?: string;

  @ApiProperty({
    example: 'newSecurePassword123',
    description: 'The updated password of the user (min 8 characters)',
    required: false,
    minLength: 8
  })
  password?: string;

  @ApiProperty({
    example: 'John Smith',
    description: 'The updated full name of the user',
    required: false
  })
  name?: string;

  @ApiProperty({
    example: '+9876543210',
    description: 'The updated phone number of the user',
    required: false
  })
  phoneNumber?: string;
}