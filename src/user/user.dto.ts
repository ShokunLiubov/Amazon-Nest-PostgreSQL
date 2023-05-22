import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator'

export class UserDto {
    @IsEmail()
    email: string

    @MinLength(6, {
        message:'Password must be at least 6 characters long'
    })
    @IsOptional()
    @IsString()
    password: string

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    avatarPath: string

    @IsOptional()
    @IsString()
    phone?: string
};