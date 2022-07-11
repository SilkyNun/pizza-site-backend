import { ApiProperty } from "@nestjs/swagger";
import { Pizza } from "@prisma/client";
import { AddonEntity } from "src/addon/entities/addon.entity";
import { IngredientEntity } from "src/ingredient/entities/ingredient.entity";
import { VariantEntity } from "src/variant/entities/variant.entity";

export class PizzaEntity implements Pizza {
    @ApiProperty({example: 1, description: 'Id of pizza'})
    id: number;

    @ApiProperty({example: 'Мясная', description: 'Type of pizza'})
    type: string;

    @ApiProperty({example: 'Маргарита', description: 'Name of pizza'})
    name: string;

    @ApiProperty({type: [VariantEntity]})
    variants: VariantEntity[]
    
    @ApiProperty({type: [AddonEntity]})
    addons: AddonEntity[]

    @ApiProperty({type: [IngredientEntity]})
    ingredients: IngredientEntity[]
}
