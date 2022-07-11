import { ApiProperty } from "@nestjs/swagger";
import { Ingredient } from "@prisma/client";

export class IngredientEntity implements Ingredient {
    @ApiProperty({example: 1, description: 'Id of ingredient'})
    id: number;
    @ApiProperty({example: 'ingredient', description: 'Name of the ingredient'})
    name: string;
    @ApiProperty({example: false, description: 'Is ingredient required?'})
    required: boolean;
    @ApiProperty({example: 1, description: 'Id of pizza that owned this ingredient'})
    pizzaId: number;

}