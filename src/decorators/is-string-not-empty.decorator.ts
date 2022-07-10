import { applyDecorators } from "@nestjs/common";
import { IsNotEmpty, IsString } from "class-validator";

export function IsStringNotEmpty() {
    return applyDecorators(
        IsString(),
        IsNotEmpty()
    );
}