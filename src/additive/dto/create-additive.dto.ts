import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class CreateAdditiveDto {
    @IsStringNotEmpty()
    @ApiProperty({example: 'https://some-resource/image.png', description: 'Image of additive'})
    image: string;
    
    @IsStringNotEmpty()
    @ApiProperty({example: 'additive', description: 'Name of additive'})
    name: string;

    @IsNumber()
    @ApiProperty({example: 3.5, description: 'Price of additive in BYN  '})
    price: number;
}
