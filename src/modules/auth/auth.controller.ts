import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';

import { ChangePasswordDto } from './dto/change-password.dto';
import { UserLoginDto } from './dto/login.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login user' })
  async login(@Body() userLoginDto: UserLoginDto) {
    return this.authService.login(userLoginDto);
  } 

  @Put('change-password')
  @ApiOperation({ summary: 'Change password'})
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async changePassword(@Body() changePasswordDto: ChangePasswordDto) {
    const result = await this.authService.changePassword(changePasswordDto);
    return result;
  }
  
}
