import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator";
import { IsStringNotEmpty } from "src/decorators";

export class QueryParams {
    @IsOptional()
    @IsNumberString()
    @ApiProperty({example: 1, description: 'Page that should be sent', required: false})
    _page?: string;
    
    @IsOptional()
    @IsNumberString()
    @ApiProperty({example: 10, description: 'Count of records for one page', required: false})
    _limit?: string;
    
    @IsOptional()
    @IsString()
    @ApiProperty({example: 'some search string', description: 'Search string', required: false})
    search?: string;
}