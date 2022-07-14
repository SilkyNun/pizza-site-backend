import { ApiProperty } from "@nestjs/swagger";
import { Order } from "@prisma/client";
import { AdditiveEntity } from "src/additive/entities/additive.entity";
import { SelectedPizzaEntity } from "src/selected-pizza/entity/selected-pizza.entity";

export class OrderEntity implements Order {
    @ApiProperty({example: 1, description: 'Id of order'})
    id: number;

    @ApiProperty({example: '2022-01-01T00:00:00.000Z', description: 'Create timestamp of order'})
    createdAt: Date;

    @ApiProperty({example: 1, description: 'Id of user that has made order'})
    userId: number;

    @ApiProperty({type: [SelectedPizzaEntity]})
    pizzas: SelectedPizzaEntity[];

    @ApiProperty({type: [AdditiveEntity]})
    additives: AdditiveEntity[]
}
