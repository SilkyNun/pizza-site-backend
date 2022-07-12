import { CreateSelectedPizzaDto } from "src/selected-pizza/dto/create-selected-pizza.dto";

export class CreateOrderDto {
    selectedPizzas: CreateSelectedPizzaDto[];
    additives: number[] //ids of additives
    userId: number; //id of user that making order
}
