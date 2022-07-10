import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class CreateIngredientDto {
    @IsStringNotEmpty()
    @ApiProperty({example: 'ingredient', description: 'Name of ingredient'})
    name: string;
    @IsBoolean()
    @ApiProperty({example: false, description: 'Is ingredient required?'})
    required: boolean;
}
