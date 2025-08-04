import * as bcrypt from 'bcrypt';

import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import * as config from 'config';

import { CreateUserDto } from './dto/create-user.dto';
import { EmailService } from '../email/email.service'; 
import { User } from 'src/database/entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { InvalidTokenException } from './exceptions/invalid-token.exception';

@Injectable()
export class UsersService {
  private readonly emailConfig = config.get('email');

   constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private emailService: EmailService, 
  ) {}

  async sendVerificationEmail(user: User): Promise<void> {
    await this.emailService.sendVerificationEmail(user);
  }

  async markEmailAsUnsent(userId: number): Promise<void> {
    await this.usersRepository.update(userId, {
      emailVerificationToken: null,
      emailVerificationExpires: null
    });
  }

 


    async create(createUserDto: CreateUserDto): Promise<User> {
    // Check if email already exists
    const existingUser = await this.usersRepository.findOneBy({ 
      email: createUserDto.email 
    });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    } 

    const verificationToken = uuidv4();
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    // const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.usersRepository.create({
      ...createUserDto,
      // password: hashedPassword,
      isActive: false, // User inactive until email verified
      emailVerificationToken: verificationToken,
      emailVerificationExpires: verificationExpires,
      isEmailVerified: false,
    });

    const savedUser = await this.usersRepository.save(user);

    try {
      await this.sendVerificationEmail(savedUser);
      return savedUser;
    } catch (error) {
      // If email fails, delete the user to prevent orphaned records
      await this.usersRepository.delete(savedUser.id);
      throw new InternalServerErrorException('Failed to send verification email');
    }
  }

  async verifyEmail(token: string): Promise<User> {
    const user = await this.usersRepository.findOneBy({ 
      emailVerificationToken: token 
    });

    if (!user || !user.emailVerificationExpires || user.emailVerificationExpires < new Date()) {
      throw new InvalidTokenException();
    }

    // Activate the user
    user.isActive = true;
    user.isEmailVerified = true;
    user.emailVerificationToken = null;
    user.emailVerificationExpires = null;

    return this.usersRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }  

  async findByEmail(email: string): Promise<User | null> {
  return this.usersRepository
    .createQueryBuilder('user')
    .addSelect('user.password') // ← include hidden password field
    .where('user.email = :email', { email })
    .getOne();
}

   async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    
    // Hash the password if it's being updated
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }
 
    // Merge the updates with the existing user
    const updatedUser = this.usersRepository.merge(user, updateUserDto);
    
    return this.usersRepository.save(updatedUser);
  }

  async remove(id: number): Promise<void> {
    const result = await this.usersRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
  }
}