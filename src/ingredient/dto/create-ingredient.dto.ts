import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsString } from "class-validator";

export class CreateIngredientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({example: 'ingredient', description: 'Name of ingredient'})
    name: string;
    @IsBoolean()
    @ApiProperty({example: false, description: 'Is ingredient required?'})
    required: boolean;
}
