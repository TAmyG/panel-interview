import { IsInt, IsString, IsDateString, IsOptional } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly email: string;

    @IsString()
    readonly fullname: string;

    @IsOptional()
    @IsDateString()
    readonly birth: string;

    @IsString()
    readonly password: string;

    @IsInt()
    readonly role: number;
}