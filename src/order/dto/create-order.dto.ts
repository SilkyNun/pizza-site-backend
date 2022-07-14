import { ApiProperty } from "@nestjs/swagger";
import { Order } from "@prisma/client";
import { Type } from "class-transformer";
import { IsArray, ValidateNested } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";
import { CreateSelectedPizzaDto } from "src/selected-pizza/dto/create-selected-pizza.dto";

export class CreateOrderDto {
    @ApiProperty({type: [CreateSelectedPizzaDto]})
    @IsArray()  
    @ValidateNested({each: true})
    @Type(() => CreateSelectedPizzaDto)
    selectedPizzas: CreateSelectedPizzaDto[];
    @ApiProperty({example: [1,2,3], description: 'Ids of additives'})
    @IsArray()
    additives: number[];
}
