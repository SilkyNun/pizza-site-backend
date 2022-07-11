import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdditiveService } from './additive.service';
import { CreateAdditiveDto } from './dto/create-additive.dto';
import { UpdateAdditiveDto } from './dto/update-additive.dto';
import { AdditiveEntity } from './entities/additive.entity';

@Controller('additive')
@ApiTags('Additive controller')
export class AdditiveController {
  constructor(private readonly additiveService: AdditiveService) {}

  @Post()
  @ApiCreatedResponse({type: AdditiveEntity})
  create(@Body() createAdditiveDto: CreateAdditiveDto) {
    return this.additiveService.create(createAdditiveDto);
  }

  @Get()
  @ApiOkResponse({type: [AdditiveEntity]})
  findAll() {
    return this.additiveService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: AdditiveEntity})
  findOne(@Param('id') id: string) {
    return this.additiveService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: AdditiveEntity})
  update(@Param('id') id: string, @Body() updateAdditiveDto: UpdateAdditiveDto) {
    return this.additiveService.update(+id, updateAdditiveDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: AdditiveEntity})
  remove(@Param('id') id: string) {
    return this.additiveService.remove(+id);
  }
}
