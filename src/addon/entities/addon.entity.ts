import { ApiProduces, ApiProperty } from "@nestjs/swagger";
import { Addon } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime";

export class AddonEntity implements Addon {
    @ApiProperty({example: '1', description: 'Id of addon record'})
    id: number;
    @ApiProperty({example: 'https://some-resource/image.png', description: 'Image URL'})
    image: string;
    @ApiProperty({example: 'addon', description: 'Name of addon'})
    name: string;
    @ApiProperty({example: 12.3, description: 'Price of addon in BYN'})
    price: Decimal;
}
