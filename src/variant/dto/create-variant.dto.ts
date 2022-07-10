import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class CreateVariantDto {
    @IsStringNotEmpty()
    @ApiProperty({example: 'https://some-resource/image.png', description: 'Image URL'})
    image: string;

    @IsStringNotEmpty()
    @ApiProperty({example: 'тонкое', description: 'Type of dough'})
    dough: string;
    
    @IsNumber()
    @ApiProperty({example: 30, description: 'Size of pizza'})
    size: number;

    @IsNumber()
    @ApiProperty({example: 400, description: 'Weight of pizza in gramms'})
    weight: number;

    @IsNumber()
    @ApiProperty({example: 23.2, description: 'Pizza price'})
    price: number;
}
