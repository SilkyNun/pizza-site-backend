import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "@prisma/client";

export class IngredientEntity implements Ingredient{
    @ApiProperty({example: 1, description: 'Ingredient id'})
    id: number;
    @ApiProperty({example: 'ingredient', description: 'Name of ingredient'})
    name: string;
    @ApiProperty({example: false, description: 'Is ingredient required?'})
    required: boolean;
}

