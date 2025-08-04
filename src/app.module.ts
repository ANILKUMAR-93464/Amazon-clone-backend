import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import dataSource from './config/typeorm-config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal:true
  }),
    TypeOrmModule.forRoot({ ...dataSource.options }), 
    UsersModule, AuthModule
  ], 
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}