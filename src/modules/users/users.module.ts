// import { Module } from '@nestjs/common';
// import { UsersService } from './users.service';
// import { UsersController } from './users.controller';

// @Module({
//   controllers: [UsersController],
//   providers: [UsersService],
// })
// export class UsersModule {}


import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from 'src/database/entities/user.entity';
import { EmailModule } from '../../services/email/email.module';
import { AuthModule } from '../auth/auth.module';


@Module({
  imports: [TypeOrmModule.forFeature([User]),forwardRef(()=> AuthModule), EmailModule], 
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService], 
})
export class UsersModule {}
