import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class CreateAddonDto {
    @IsStringNotEmpty()
    @ApiProperty({example: 'https://some-resource/image.png', description: 'Image URL'})
    image: string;

    @IsStringNotEmpty()
    @ApiProperty({example: 'addon', description: 'Name of addon'})
    name: string;

    @IsNumber()
    @ApiProperty({example: 12.3, description: 'Price of addon in BYN'})
    price: number;
}
