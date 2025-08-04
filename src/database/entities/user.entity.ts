
import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert, BeforeUpdate, AfterUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ 
    example: 1, 
    description: 'The unique identifier of the user' 
  })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    example: 'user@example.com',
    description: 'The email address of the user',
    uniqueItems: true
  })

   @ApiProperty({
    example: 'John Doe',
    description: 'The full name of the user'
  })
    @Column()
    name: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({
    example: '+1234567890',
    description: 'The phone number of the user',
    required: false,
    nullable: true
  })
  @Column({ name: 'phone_number', type: 'varchar', nullable: true, length: 20 })
  phoneNumber: string | null;

  @Column({name:'is_active', default: false })
  isActive: boolean;

  @ApiProperty({
    example: false,
    description: 'Whether the user has verified their email',
    default: false
  })
  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @ApiProperty({
    example: 'customer',
    description: 'The role of the user',
    enum: ['customer', 'seller', 'admin'],
    default: 'customer'
  })
  @Column({
    type: 'enum',
    enum: ['customer', 'seller', 'admin'],
    default: 'customer',
  })
  role: string;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the user was created',
    default: 'CURRENT_TIMESTAMP'
  })
  @Column({ name: 'created_at', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @ApiProperty({
    example: '2023-01-01T00:00:00.000Z',
    description: 'The date when the user was last updated',
    default: 'CURRENT_TIMESTAMP'
  })
  @Column({
    name: 'updated_at',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ApiProperty({
    example: 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8',
    description: 'The email verification token',
    required: false,
    nullable: true
  })
  @Column({ 
    name: 'email_verification_token', 
    type: 'varchar', 
    length: 255,
    nullable: true  
  })
  emailVerificationToken: string | null;

  @ApiProperty({
    example: '2023-01-02T00:00:00.000Z',
    description: 'The expiration date of the verification token',
    required: false,
    nullable: true
  })
  @Column({ 
    name: 'email_verification_expires', 
    type: 'timestamp', 
    nullable: true 
  })
  emailVerificationExpires: Date | null;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }

  async comparePassword(attempt: string): Promise<boolean> {
    return bcrypt.compare(attempt, this.password);
  }
}
