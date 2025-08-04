import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
  ApiQuery,
  ApiBearerAuth,
  ApiParam,
} from '@nestjs/swagger';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: CreateUserDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully. Verification email sent.', type: User,
    schema: {
      example: {
        success: true,
        message: 'User registered. Verification email sent.',
        data: {
          id: 1,
          email: 'user@example.com',
          isEmailVerified: false,
        },
      },
    },
  })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  @ApiResponse({ status: 409, description: 'Email already exists' })
  @ApiResponse({ status: 500,  description: 'Failed to send verification email'})
    
  async register(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.create(createUserDto);
    return {
      success: true,
      message:
        'Registration successful. Please check your email to verify your account.',
      data: {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
      },
    };
  }

  @Get('verify-email')
  @ApiOperation({ summary: 'Verify email address' })
  async verifyEmail(@Query('token') token: string) {
    const user = await this.usersService.verifyEmail(token);
    return {
      success: true,
      message: 'Email verified successfully! Your account is now active.',
      data: {
        id: user.id,
        email: user.email,
        isActive: user.isActive,
      },
    };
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiBearerAuth()
  @ApiResponse({
    status: 200,
    description: 'List of all users',
    type: [User],
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by ID' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({
    status: 200,
    description: 'User details',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async findOne(@Param('id') id: string): Promise<User | null> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    status: 200,
    description: 'Updated user details',
    type: User,
  })
  @ApiResponse({ status: 404, description: 'User not found' })
  async update(
    @Param('id') id: string,
    @Body() updateData: UpdateUserDto,
  ): Promise<User> {
    return this.usersService.update(+id, updateData);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete user' })
  @ApiBearerAuth()
  @ApiParam({ name: 'id', type: 'number', example: 1 })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  async remove(@Param('id') id: string): Promise<void> {
    return this.usersService.remove(+id);
  }
}
