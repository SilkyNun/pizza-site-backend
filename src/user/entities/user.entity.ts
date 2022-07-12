import { ApiProperty } from "@nestjs/swagger";
import { User } from "@prisma/client";

export class UserEntity{
    @ApiProperty({example: 1, description: 'Id of user'})
    id: number;

    @ApiProperty({example: '2022-01-01T00:00:00.000', description: 'Timestamp when user was created'})
    createdAt: Date;

    @ApiProperty({example: '2022-01-01T00:00:00.000', description: 'Timestamp when user was last updated'})
    updatedAt: Date;

    @ApiProperty({example: 'First Name', description: 'First name of user'})
    firstName: string;
    
    @ApiProperty({example: 'Last Name', description: 'Last name of user (might be null)'})
    lastName: string;

    @ApiProperty({example: 'sample@example.com', description: 'email of user'})
    email: string;

    @ApiProperty({example: '+375290000000', description: 'User mobile number'})
    tel: string;

    @ApiProperty({example: 'Some street, some house, some flat', description: 'Address of user'})
    address: string;

    @ApiProperty({example: 'username', description: 'Username'})
    username: string; 
}
