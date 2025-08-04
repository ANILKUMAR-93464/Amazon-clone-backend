import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";


export class ChangePasswordDto {
    @ApiProperty()
    @IsEmail()
    email:string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    old_password:string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    new_password:string;

    @ApiProperty()
    @IsString()
    @MinLength(6)
    confirm_password:string;
}
