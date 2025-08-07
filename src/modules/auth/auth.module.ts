import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../jwt/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import * as config from 'config';
import { UsersModule } from '../users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

const jwtConfig = config.get('secretKey.secret');

@Module({
  imports: [PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: jwtConfig,
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),forwardRef(() => UsersModule)
  ],
  controllers:[AuthController],
  providers: [JwtStrategy, AuthService],
  exports: [JwtModule,AuthService], // Add this line to export JwtService
})
export class AuthModule {}

// @Module({
//   imports:[PassportModule,JwtModule.register({

//     secret: jwtConfig.secret,
//     signOptions: {expiresIn: '1d'},

//   }), forwardRef(() => UsersModule) ],
//   controllers: [AuthController],
//   providers: [AuthService, JwtStrategy],
//   exports:[AuthService, JwtModule],

// })
// export class AuthModule {}
