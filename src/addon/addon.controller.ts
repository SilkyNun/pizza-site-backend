import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddonService } from './addon.service';
import { CreateAddonDto } from './dto/create-addon.dto';
import { UpdateAddonDto } from './dto/update-addon.dto';
import { AddonEntity } from './entities/addon.entity';

@Controller('addon')
@ApiTags('Addon controller')
export class AddonController {
  constructor(private readonly addonService: AddonService) {}

  @Post()
  @ApiCreatedResponse({type: AddonEntity})
  create(@Body() createAddonDto: CreateAddonDto) {
    return this.addonService.create(createAddonDto);
  }

  @Get()
  @ApiOkResponse({type: [AddonEntity]})
  findAll() {
    return this.addonService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({type: AddonEntity})
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.addonService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({type: AddonEntity})
  update(@Param('id', ParseIntPipe) id: number, @Body() updateAddonDto: UpdateAddonDto) {
    return this.addonService.update(+id, updateAddonDto);
  }

  @Delete(':id')
  @ApiOkResponse({type: AddonEntity})
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.addonService.remove(+id);
  }
}
