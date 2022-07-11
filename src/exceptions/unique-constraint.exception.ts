import { HttpCode, HttpException, HttpStatus } from "@nestjs/common";

export class UniqueConstraintExeption extends HttpException {
    constructor() {
        super(`Unique constraint failed while executing query`, HttpStatus.BAD_REQUEST);
    }
}