import { HttpException, HttpStatus } from "@nestjs/common";

export class OrderNotFoundException extends HttpException {
    constructor(id: number, userId: number) {
        super(`Order with id=${id} and userId=${userId} is not found`, HttpStatus.NOT_FOUND);
    }
}