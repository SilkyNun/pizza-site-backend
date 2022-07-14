import { ApiProperty } from "@nestjs/swagger";
import { SelectedPizza } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class SelectedPizzaEntity implements SelectedPizza {
    @ApiProperty({example: 1, description: 'Id of pizza'})
    id: number;
    
    @ApiProperty({example: 'Мясная', description: 'Type of pizza'})
    type: string;
    
    @ApiProperty({example: 'Маргарита', description: 'Name of pizza'})
    name: string;
    
    @ApiProperty({example: 'https://some-resource/image.png', description: 'Image of variant'})
    image: string;
    
    @ApiProperty({example: 'тонкое', description: 'Type of dough'})
    dough: string;
    
    @ApiProperty({example: 30, description: 'Size of pizza'})
    size: number;
    
    @ApiProperty({example: 400, description: 'Weight of pizza in gramms'})
    weight: number;
    
    @ApiProperty({example: 23.2, description: 'Pizza price'})
    price: Decimal;
    
    @ApiProperty({example: 1, description: 'Id of order'})
    orderId: number;
}