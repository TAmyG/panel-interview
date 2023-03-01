import { IsInt, IsString, IsDateString } from 'class-validator';

export class CreateUserDto {
    @IsString()
    readonly email: string;

    @IsString()
    readonly fullname: string;

    @IsDateString()
    readonly birth: string;

    @IsString()
    readonly password: string;

    @IsInt()
    readonly role: number;
}