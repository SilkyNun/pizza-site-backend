import { ApiProperty } from "@nestjs/swagger";
import { Variant } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class VariantEntity implements Variant {
    @ApiProperty({example: 1, description: 'Id of variant'})
    id: number;
    
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
    
    @ApiProperty({example: 1, description: 'Id of pizza that ownes this variant'})
    pizzaId: number;
}