import { HttpException, HttpStatus } from "@nestjs/common";

export class PizzaNotFoundException extends HttpException {
    constructor(id: number) {
        super(`Pizza with id=${id} is not found`, HttpStatus.NOT_FOUND);
    }
}