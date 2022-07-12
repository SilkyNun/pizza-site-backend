export class CreateSelectedPizzaDto {
    type: string;
    name: string;
    image: string;
    dough: string;
    size: number;
    weight: number;
    price: number;
    ingredients: number[] //ids of ingredients
    addons: number[] //ids of addons
}