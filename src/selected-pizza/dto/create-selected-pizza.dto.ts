import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNumber } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class CreateSelectedPizzaDto {
    @ApiProperty({example: 'Мясная', description: 'Type of pizza'})
    @IsStringNotEmpty()
    type: string;

    @ApiProperty({example: 'Маргарита', description: 'Name of pizza'})
    @IsStringNotEmpty()
    name: string;

    @ApiProperty({example: 'https://some-resource/image.png', description: 'Image URL'})
    @IsStringNotEmpty()
    image: string;
    
    @ApiProperty({example: 'тонкое', description: 'Type of dough'})
    @IsStringNotEmpty()
    dough: string;
    
    @ApiProperty({example: 30, description: 'Size of pizza'})
    @IsNumber()
    size: number;
    
    @ApiProperty({example: 400, description: 'Weight of pizza in gramms'})
    @IsNumber()
    weight: number;
    
    @ApiProperty({example: 23.2, description: 'Pizza price'})
    @IsNumber()
    price: number;
    
    @ApiProperty({example: [1,2,3], description: 'Ids of ingredients'})
    @IsArray()
    ingredients: number[] //ids of ingredients
    
    @ApiProperty({example: [1,2,3], description: 'Ids of addons'})
    @IsArray()
    addons: number[] //ids of addons
}