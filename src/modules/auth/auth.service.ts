import { Injectable } from '@nestjs/common';

import { ChangePasswordDto } from './dto/change-password.dto';
import { UserLoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {

  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService:UsersService
  ){}


  async login(userLoginDto: UserLoginDto) {
    const {email, password} = userLoginDto;
    const user = await this.usersService.findByEmail(email);
    
    console.log(user)
    if(!user || !(await bcrypt.compare(password, user?.password)) ){
      throw new Error("Invalid Credentials..")
    }

    const payload = {
      sub: user.id,
      email: user.email,
      role: user.role
    }

    return {
      access_token: this.jwtService.sign(payload),
      user
    }
  }

  async changePassword(changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findByEmail(changePasswordDto.email)
    if(!user){
      return {message: "User Not Found"}
    }
    
    const isOldPasswordValid = await bcrypt.compare(changePasswordDto.old_password, user.password)

     if (!isOldPasswordValid) throw new Error('Old password is incorrect');

     if(changePasswordDto.new_password !== changePasswordDto.confirm_password){
      throw new Error(`New Password and confirm password doesn't match`);
     }

  user.password = await changePasswordDto.new_password;
  return this.usersService.save(user);  



  }

}
