import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import { CreateAddonDto } from "src/addon/dto/create-addon.dto";
import { IsStringNotEmpty } from "src/decorators";
import { CreateIngredientDto } from "src/ingredient/dto/create-ingredient.dto";
import { CreateVariantDto } from "src/variant/dto/create-variant.dto";

export class CreatePizzaDto {
    @IsStringNotEmpty()
    @ApiProperty({example: 'Мясная', description: 'Type of pizza'})
    type: string;
    
    @IsStringNotEmpty()
    @ApiProperty({example: 'Маргарита', description: 'Name of pizza'})
    name: string;

    @ApiProperty({type: [CreateVariantDto]})
    @ValidateNested({each: true})
    @Type(() => CreateVariantDto)
    variants: CreateVariantDto[];
    
    @ApiProperty({type: [CreateIngredientDto]})
    @ValidateNested({each: true})
    @Type(() => CreateIngredientDto)
    ingredients: CreateIngredientDto[];
    
    @ApiProperty({type: [CreateAddonDto]})
    @ValidateNested({each: true})
    @Type(() => CreateAddonDto)
    addons: CreateAddonDto[];
}
