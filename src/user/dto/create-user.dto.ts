import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsAlphanumeric, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class CreateUserDto {
    @IsStringNotEmpty()
    @ApiProperty({example: 'First Name', description: 'First name of user'})
    firstName: string;

    @IsStringNotEmpty()
    @IsOptional()
    @ApiProperty({example: 'Last Name', description: 'Last name of user (might be null)'})
    lastName?: string;

    @IsEmail()
    @ApiProperty({example: 'sample@example.com', description: 'email of user'})
    email: string;

    @IsMobilePhone('be-BY')
    @ApiProperty({example: '+375290000000', description: 'User mobile number'})
    tel: string;

    @IsStringNotEmpty()
    @ApiProperty({example: 'Some street, some house, some flat', description: 'Address of user'})
    address: string;

    @IsAlphanumeric()
    @ApiProperty({example: 'username', description: 'Username'})
    username: string;

    @IsStringNotEmpty()
    @ApiProperty({example: 'password', description: 'Password'})
    password: string;

    @IsOptional()
    @IsEnum(Role, {each: true})
    @ApiProperty({enum: Role, description: 'Roles of user', example: [Role.USER, Role.ADMIN]})
    roles?: Role[]
}
