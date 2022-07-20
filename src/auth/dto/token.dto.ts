import { ApiProperty } from "@nestjs/swagger";

export class TokenDto {
    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...',
        description: 'Access token that returned after successful authentication'
    })
    access_token: string;

    @ApiProperty({
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...',
        description: 'Refresh token that returned after successful authentication'
    })
    refresh_token: string;
}