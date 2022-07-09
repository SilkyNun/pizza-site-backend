import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AdditiveService } from './additive.service';
import { CreateAdditiveDto } from './dto/create-additive.dto';
import { UpdateAdditiveDto } from './dto/update-additive.dto';

@Controller('additive')
export class AdditiveController {
  constructor(private readonly additiveService: AdditiveService) {}

  @Post()
  create(@Body() createAdditiveDto: CreateAdditiveDto) {
    return this.additiveService.create(createAdditiveDto);
  }

  @Get()
  findAll() {
    return this.additiveService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.additiveService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdditiveDto: UpdateAdditiveDto) {
    return this.additiveService.update(+id, updateAdditiveDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.additiveService.remove(+id);
  }
}
