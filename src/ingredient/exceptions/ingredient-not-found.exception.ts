import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";

export class IngredientNotFoundException extends HttpException {
    constructor(id: number) {
        super(`Ingredient with id=${id} is not found`, HttpStatus.NOT_FOUND);
    }
}