import { HttpException, HttpStatus } from "@nestjs/common";

export class AdditiveNotFoundException extends HttpException {
    constructor(id: number) {
        super(`Additive with id=${id} is not found`, HttpStatus.NOT_FOUND);
    }
}