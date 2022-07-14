import { ApiProperty } from "@nestjs/swagger";
import { IsAlphanumeric, IsNotEmpty } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class AuthDto {
    @ApiProperty({example: 'username', description: 'Username. Should be alphanumberic'})
    @IsAlphanumeric()
    @IsNotEmpty()
    username: string;

    @ApiProperty({example: 'password', description: 'Password'})
    @IsStringNotEmpty()
    password: string;
}