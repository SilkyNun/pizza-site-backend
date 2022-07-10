import { HttpException, HttpStatus } from "@nestjs/common";

export class AddonNotFoundException extends HttpException {
    constructor(id: number) {
        super(`Addon with id=${id} is not found`, HttpStatus.NOT_FOUND);
    }
}