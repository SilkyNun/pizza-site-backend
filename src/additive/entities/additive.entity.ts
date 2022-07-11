import { ApiProperty } from "@nestjs/swagger";
import { Additive } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class AdditiveEntity implements Additive {
    @ApiProperty({example: 1, description: 'Id of additive'})
    id: number;

    @ApiProperty({example: 'https://some-resource/image.png', description: 'Image of additive'})
    image: string;

    @ApiProperty({example: 'additive', description: 'Name of additive'})
    name: string;

    @ApiProperty({example: 3.5, description: 'Price of additive in BYN'})
    price: Decimal;
}
